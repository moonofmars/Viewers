import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Dropdown from '../Dropdown';
import Icon from '../Icon';
import IconButton from '../IconButton';
import NavBar from '../NavBar';
import Svg from '../Svg';

function Header({
  children,
  menuOptions,
  isReturnEnabled,
  onClickReturnButton,
  isSticky,
  WhiteLabeling,
  ...props
}): ReactNode {
  const { t } = useTranslation('Header');
  const navigate = useNavigate();
  // TODO: this should be passed in as a prop instead and the react-router-dom
  // dependency should be dropped
  const onClickReturn = () => {
    if (isReturnEnabled && onClickReturnButton) {
      onClickReturnButton();
    }
  };

  return (
    <NavBar
      className="justify-between border-b-4 border-black"
      isSticky={isSticky}
    >
      <div className="flex justify-between flex-1">
        <div className="flex items-center">
          {/* // TODO: Should preserve filter/sort
              // Either injected service? Or context (like react router's `useLocation`?) */}
          <div
            className={classNames(
              'inline-flex items-center mr-3',
              isReturnEnabled && 'cursor-pointer'
            )}
            onClick={onClickReturn}
          >
            {isReturnEnabled && (
              <Icon name="chevron-left" className="w-8 text-primary-active" />
            )}
            <div className="inline-flex items-center" style={{ marginLeft: 20 }} id='rs_logo'>
              {/* {WhiteLabeling?.createLogoComponentFn?.(React, props) || (
                <Svg name="logo-ohif" />
              )} */}
              <Svg name="logo0" />
              <span style={{ color: 'white', marginLeft: 15, fontFamily: 'monospace' }}>View DICOM Anywhere Anytime</span>
            </div>
          </div>
        </div>
        <div className="flex items-center">{children}</div>
        <div className="flex items-center" id="rs_options">
          {!isReturnEnabled &&
            <div className="flex items-center cursor-pointer" title='Load local files' onClick={() => navigate('/local')}>
              <Svg name="open" />
              <span className="ml-1 mr-3 text-md text-common-light">{t('Local')}</span>
            </div>}
          <span className="mr-3 text-md text-common-light">
            {t('INVESTIGATIONAL USE ONLY')}
          </span>
          <Dropdown showDropdownIcon={false} list={menuOptions}>
            {/* <div>****test****🚗</div> */}
            <IconButton
              id={'options-settings-icon'}
              variant="text"
              color="inherit"
              size="initial"
              className="text-primary-active"
            >
              <Icon name="settings" />
            </IconButton>
            <IconButton
              id={'options-chevron-down-icon'}
              variant="text"
              color="inherit"
              size="initial"
              className="text-primary-active"
            >
              <Icon name="chevron-down" />
            </IconButton>
          </Dropdown>
        </div>
      </div>
    </NavBar>
  );
}

Header.propTypes = {
  menuOptions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.string,
      onClick: PropTypes.func.isRequired,
    })
  ),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  isReturnEnabled: PropTypes.bool,
  isSticky: PropTypes.bool,
  onClickReturnButton: PropTypes.func,
  WhiteLabeling: PropTypes.object,
};

Header.defaultProps = {
  isReturnEnabled: true,
  isSticky: false,
};

export default Header;
