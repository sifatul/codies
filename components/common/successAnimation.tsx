import successAnimationJson from '../../animation/successAnimation.json';
import Lottie from 'react-lottie';

const SuccessAnimation = (props: any) => {
  const { callback, open } = props
  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  if (!open) return <></>
  return <>
    <Lottie
      options={{
        ...defaultOptions,
        animationData: successAnimationJson,
        loop: false,
      }}
      eventListeners={[
        {
          eventName: 'complete',
          callback,
        },
      ]}
      height={"100%"}
      width={"100%"}
    />
  </>
}
export default SuccessAnimation