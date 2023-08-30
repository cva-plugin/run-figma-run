import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import classNames from 'classnames/bind';
import styles from './dropdown.css';

const cx = classNames.bind(styles);

const DropdownInnerMenu = ({
  className,
  menuRef,
  style,
  list,
  menuAlign,
  open,
  selected,
  showSelected,
  selectedClassName,
  linkClassName,
  itemClassName,
  itemRenderFn,
  itemClickFn,
  itemTitleProp = 'title'
}) => {
  const getItemText = item => get(item, itemTitleProp);

  const renderMenu = (listItem, i) => {
    const items = listItem.items;
    const itemText = getItemText(listItem);
    const isSelected = isEqual(listItem, selected);
    const clickFn = e => {
      e.preventDefault();
      if (isFunction(itemClickFn)) {
        itemClickFn(listItem);
      }
    };
    const subListClass = cx('list', 'list-sub');
    const itemClass = cx('list-item', itemClassName, {
      'link-item': !listItem.items,
      selected: showSelected && isSelected,
      [selectedClassName]: showSelected && isSelected && selectedClassName
    });
    const textClass = cx('list-item-text');
    const linkClass = cx('list-item-link', linkClassName);

    const renderItem = () =>
      itemRenderFn ? (
        itemRenderFn(listItem, itemText, itemClickFn)
      ) : (
        <button type="button" className={linkClass} onClick={clickFn}>
          {itemText}
        </button>
      );

    return (
      <li key={i} className={itemClass}>
        {items ? <span className={textClass}>{itemText}</span> : renderItem()}
        {items && <ul className={subListClass}>{items.map(renderMenu)}</ul>}
      </li>
    );
  };

  const cxname = cx('list', 'list-main', className, `align-${menuAlign}`, {
    open,
    close: open === false
  });

  return (
    <ul className={cxname} style={style} ref={menuRef}>
      {!!list && list.map(renderMenu)}
    </ul>
  );
};

DropdownInnerMenu.propTypes = {
  className: PropTypes.string,
  menuRef: PropTypes.func,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      items: PropTypes.array
    })
  ),
  menuAlign: PropTypes.oneOf(['left', 'right']),
  open: PropTypes.bool,
  style: PropTypes.object,
  selected: PropTypes.object,
  showSelected: PropTypes.bool,
  selectedClassName: PropTypes.string,
  linkClassName: PropTypes.string,
  itemClassName: PropTypes.string,
  itemRenderFn: PropTypes.func,
  itemClickFn: PropTypes.func,
  itemTitleProp: PropTypes.string
};

DropdownInnerMenu.defaultProps = {
  menuAlign: 'left',
  showSelected: false,
  itemTitleProp: 'title'
};

DropdownInnerMenu.displayName = 'DropdownMenu';

export default DropdownInnerMenu;
