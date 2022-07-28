import { Rings } from 'react-loader-spinner';
import s from './Loader.module.css';
export const Loader = () => {
  return (
    <div className={s.loaderWrapper}>
      <Rings
        height="100"
        width="100"
        radius="9"
        color="red"
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
};
