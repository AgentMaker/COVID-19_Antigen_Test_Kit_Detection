import 'antd/dist/antd.less';

import { WebAI, cv } from 'webai-js'
import { ResultStatusType } from 'antd/lib/result'
import { useState, useRef, ReactNode } from 'react';
import { FileImageOutlined } from '@ant-design/icons';
import { Image, message, Button, Result, Spin } from 'antd';


// init detector
const detector = new WebAI.Det(
  './model.dynamic.quant.onnx.json',
  './configs.json'
)

export default function App() {
  // init refs
  const refImg = useRef<HTMLImageElement>(null)
  const refCanvas = useRef<HTMLCanvasElement>(null)
  const refInput = useRef<HTMLInputElement>(null)

  // init states
  const [src, setSrc] = useState<string>('./example.png')
  const [dst, setDst] = useState<string>('./example.png')
  const [icon, setIcon] = useState<ReactNode>(<FileImageOutlined />)
  const [status, setStatus] = useState<ResultStatusType>('info')
  const [visible, setVisible] = useState<boolean>(false)
  const [spinning, setSpinning] = useState<boolean>(true)

  // loading
  if (spinning) {
    // wait for model loading
    detector.promises.then(() => {
      // stop loading
      setSpinning(false)

      // set onload func of img element
      refImg.current!.onload = () => {
        // read img
        const imgRGBA = cv.imread(refImg.current!)

        // detector infer
        detector.infer(imgRGBA).then((bboxes) => {
          // if detected
          if (bboxes.length > 0) {
            // show result img
            const imgShow = WebAI.drawBBoxes(imgRGBA, bboxes)
            cv.imshow(refCanvas.current!, imgShow)
            setDst(refCanvas.current?.toDataURL("image/png")!)

            // delete imgs
            imgRGBA.delete()
            imgShow.delete()

            // set results to the pages
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
          // not detected
          else {
            setDst(refImg.current!.src)
            message.info('未检出')
            setIcon(undefined)
            setStatus('warning')
          }
        })
      }
    })
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
      onChange={({ target }) => setSrc(URL.createObjectURL(target.files![0]))}
    />
    <canvas
      ref={refCanvas}
      style={{ display: 'none' }}
    />
    <img
      src={src}
      ref={refImg}
      style={{ display: 'none' }}
    />
    <Image
      style={{ display: 'none' }}
      src={dst}
      preview={{
        visible,
        src: dst,
        onVisibleChange: value => setVisible(value)
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
          onClick={() => refInput.current?.click()}
        >
          上传图片
        </Button>,
        <Button
          key='preview'
          type="primary"
          onClick={() => setVisible(true)}
        >
          预览结果
        </Button>
      ]}
    />
  </Spin>
}
