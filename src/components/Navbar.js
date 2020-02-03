import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Media from 'react-media';
import { getLastSyncDate, getSyncedOnce } from '../selectors';
import { showSettingsModal, showPlaylistModal } from '../actions';
import { getLastSyncHuman, saveInterval } from '../helpers';
import SpotifySyncButton from './SpotifySyncButton';

function Navbar() {
  const syncedOnce = useSelector(getSyncedOnce);
  const lastSyncDate = useSelector(getLastSyncDate);
  const dispatch = useDispatch();
  const [lastSyncHuman, setLastSyncHuman] = useState(getLastSyncHuman(lastSyncDate));

  useEffect(() => {
    const updateLastSyncHuman = () => {
      setLastSyncHuman(getLastSyncHuman(lastSyncDate));
    };

    updateLastSyncHuman();
    saveInterval(updateLastSyncHuman, 60000);
    window.onfocus = updateLastSyncHuman;
  }, [lastSyncDate, setLastSyncHuman]);

  return (
    <nav className="Navbar">
      <div className="title is-4 has-text-light">
        Spotify <Media query={{ maxWidth: 375 }}>{(matches) => matches && <br />}</Media>
        Release List
      </div>
      {syncedOnce && (
        <div className="sync">
          <SpotifySyncButton title="Refresh" icon="fas fa-sync" />
          <div className="last-update has-text-grey">Last update: {lastSyncHuman}</div>
        </div>
      )}
      <div className="right">
        {syncedOnce && (
          <button
            className="button is-rounded is-dark has-text-weight-semibold"
            onClick={() => dispatch(showPlaylistModal())}
          >
            <span className="icon">
              <i className="fas fa-plus"></i>
            </span>
            <Media query={{ minWidth: 769 }}>
              {(matches) => matches && <span>Create playlist</span>}
            </Media>
          </button>
        )}
        <button
          className="button is-rounded is-dark has-text-weight-semibold"
          onClick={() => dispatch(showSettingsModal())}
        >
          <span className="icon">
            <i className="fas fa-cog"></i>
          </span>
          <Media query={{ minWidth: 769 }}>{(matches) => matches && <span>Settings</span>}</Media>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
