import { ThreeDots } from 'react-loader-spinner';

export function Loader() {
  return (
    <ThreeDots
        visible={true}
        height="20"
        width="20"
        radius="9"
        color="#F89134"
        ariaLabel="three-circles-loading"
        wrapperStyle={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        wrapperClass=""
        />
  )
}