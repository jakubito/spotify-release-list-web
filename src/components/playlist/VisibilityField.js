import React from 'react';
import { useFormContext } from 'react-hook-form';

function VisibilityField() {
  const { register } = useFormContext();

  return (
    <div className="field">
      <label className="label has-text-light">Visibility</label>
      <div className="control">
        <div className="field">
          <input
            className="is-checkradio has-background-color is-white"
            id="uriLinksTrue"
            type="radio"
            name="visibility"
            value="private"
            ref={register}
            defaultChecked
          />
          <label htmlFor="uriLinksTrue">Private</label>
        </div>
        <div className="field">
          <input
            className="is-checkradio has-background-color is-white"
            id="uriLinksFalse"
            type="radio"
            name="visibility"
            value="public"
            ref={register}
          />
          <label htmlFor="uriLinksFalse">Public</label>
        </div>
      </div>
    </div>
  );
}

export default VisibilityField;