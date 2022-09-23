import Lottie from 'react-lottie';
import loadingAnimationJson from '../../animation/loadingAnimation.json';
const LoadingAnimation = (props: any) => {
  const { open = false } = props
  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return <>

    {open && (
      <Lottie
        options={{
          ...defaultOptions,
          animationData: loadingAnimationJson,
        }}
        height={'100%'}
        width={'100%'}
      />
    )}
  </>
}
export default LoadingAnimation