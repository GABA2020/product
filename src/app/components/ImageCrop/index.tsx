import React, { Fragment, useRef, useState, FC, useEffect } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { img_user } from 'assets/images';
import { generateNewNameImage, dataUrlFile } from 'helpers/Unity';
interface IFIle {
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}
interface IImageCrop {
  imageSrc: IFIle;
  onCropDone: (imageBase64: string, name: string) => void;
  onCropCancel: () => void;
}
export const ImageCrop: FC<IImageCrop> = props => {
  const { imageSrc, onCropDone, onCropCancel } = props;
  const [scaleState, setScaleState] = useState<string>('1');
  const onHandleScale = event => {
    setScaleState(event.target.value);
  };
  const setEditorRef = useRef(null);

  useEffect(() => {
    if (imageSrc.name) {
      setScaleState('1');
    }
  }, [imageSrc.name]);

  const handelCropDone = () => {
    onCropDone(
      (setEditorRef as any).current.getImageScaledToCanvas().toDataURL(),
      generateNewNameImage(),
    );
  };

  return (
    <Fragment>
      <AvatarEditor
        image={imageSrc}
        border={10}
        borderRadius={220}
        scale={parseFloat(scaleState)}
        rotate={0}
        width={250}
        height={250}
        ref={setEditorRef}
      ></AvatarEditor>
      <div className="scale-range-wrapper">
        <input
          style={{ width: '100%' }}
          type="range"
          value={scaleState}
          name="points"
          step="0.05"
          min="1"
          max="5"
          onChange={onHandleScale}
        />
      </div>

      <div className="btn-wrapper-crop">
        <div className="btn-crop btn-crop-ok">
          <a
            onClick={e => {
              e.preventDefault();
              handelCropDone();
            }}
            href="#"
          >
            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
          </a>
        </div>
        <div className="btn-crop btn-crop-cancel">
          <a
            onClick={e => {
              e.preventDefault();
              onCropCancel();
            }}
            href="#"
          >
            <FontAwesomeIcon icon={faWindowClose}></FontAwesomeIcon>
          </a>
        </div>
      </div>
    </Fragment>
  );
};
