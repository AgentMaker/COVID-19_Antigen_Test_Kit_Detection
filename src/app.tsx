import 'antd/dist/antd.less';
import { useState, useRef, ReactNode } from 'react';
import { WebAI, cv } from 'webai-js'
import { Image, message, Button, Result, Spin } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import { ResultStatusType } from 'antd/lib/result'

const detector = new WebAI.Det('model.onnx.json', 'configs.json')

export default function App() {
  const refImg = useRef<HTMLImageElement>(null)
  const refCanvas = useRef<HTMLCanvasElement>(null)
  const refInput = useRef<HTMLInputElement>(null)
  const [src, setSrc] = useState<string>('./example.png')
  const [dst, setDst] = useState<string>('./example.png')
  const [icon, setIcon] = useState<ReactNode>(<FileImageOutlined />)
  const [status, setStatus] = useState<ResultStatusType>('info')
  const [visible, setVisible] = useState<boolean>(false);
  const [spinning, setSpinning] = useState<boolean>(true);

  if (spinning) {
    detector.promises.then(() => { setSpinning(false) })
  }

  return <Spin
    spinning={spinning}
    tip='正在加载模型，请稍后...'
  >
    <input
      ref={refInput}
      style={{ display: 'none' }}
      type='file'
      accept='image/*'
      onChange={({ target }) => {
        setSrc(URL.createObjectURL(target.files![0]))
        refImg.current!.onload = () => {
          const img = cv.imread(refImg.current!)
          detector.infer(img).then((bboxes) => {
            if (bboxes.length > 0) {
              const imgShow = WebAI.drawBBoxes(img, bboxes)
              cv.imshow(refCanvas.current!, imgShow)
              setDst(refCanvas.current?.toDataURL("image/png")!)
              imgShow.delete()
              bboxes.forEach(({
                label
              }) => {
                if (label == 'negative') {
                  message.info('阴性')
                  setIcon(undefined)
                  setStatus('success')
                }
                else if (label == 'positive') {
                  message.error('阳性')
                  setIcon(undefined)
                  setStatus('error')
                }
                else {
                  message.error('无效')
                  setIcon(undefined)
                  setStatus('warning')
                }
              })
            }
            else {
              setDst(refImg.current!.src)
              message.info('未检出')
              setIcon(undefined)
              setStatus('warning')
            }
            img.delete()
          })
        }
      }} />
    <canvas ref={refCanvas} style={{ display: 'none' }} />
    <img src={src} ref={refImg} style={{ display: 'none' }} />
    <Image
      style={{ display: 'none' }}
      src={dst}
      preview={{
        visible,
        src: dst,
        onVisibleChange: value => {
          setVisible(value);
        },
      }}
    />
    <Result
      icon={icon}
      title="COVID-19 抗原检测试剂盒结果检测"
      status={status}
      extra={[
        <Button
          key='upload'
          type="primary"
          onClick={() => {
            refInput.current?.click()
          }}>
          上传图片
        </Button>,
        <Button
          key='preview'
          type="primary"
          onClick={() => setVisible(true)}>
          预览结果
        </Button>]}
    />
  </Spin>
}
