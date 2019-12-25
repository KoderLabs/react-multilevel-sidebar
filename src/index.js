import React, { Component, Fragment } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";


class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: []
    };
    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  handleBackdropClick() {
    const { onToggle, onClose, persist } = this.props;

    onToggle(false);
    onClose && onClose();
    if (!persist) {
      setTimeout(() => {
        this.setState({ activeTab: [] });
      }, 501);
    }
  }

  handleTabClick(tabData) {
    if (!!tabData.disabled) {
      return;
    }
    const { onItemClick } = this.props;

    if (tabData.children) {
      let data = [...this.state.activeTab];
      data.push(tabData.id);
      this.setState({ activeTab: data });
    }
    onItemClick && onItemClick(tabData);
  }

  handleBackClick(tabData) {
    const { onBackClick } = this.props;

    if (tabData) {
      let data = [...this.state.activeTab];
      let index = data.findIndex(id => id === tabData.id);
      data.splice(index, 1);
      this.setState({ activeTab: data });
    } else {
      this.setState({ activeTab: [] });
    }
    onBackClick && onBackClick();
  }

  getParentHeight() {
    let parent = document.querySelector("#sidebar-parent");
    return parent ? parent.scrollHeight : "100vh";
  }

  renderSecondChildren(parent, list) {
    const { wrapperClassName } = this.props;
    const { activeTab } = this.state;

    return (
      <SidebarContent
        {...this.props}
        sidebarProps={{
          className: classNames("sidebar-main second", {
            show: activeTab.includes(list.id),
            [wrapperClassName]: wrapperClassName
          }),
          style: { height: this.getParentHeight() }
        }}
        headerContent={
          <Fragment>
            <div
              className="first-back-btn"
              onClick={() => this.handleBackClick()}
            >
              <AngleLeft />
              <span>{parent.name}</span>
            </div>
            <div
              className="second-back-btn"
              onClick={() => this.handleBackClick(list)}
            >
              <AngleLeft />
              <span>{list.name}</span>
            </div>
          </Fragment>
        }
        options={list.children}
        handleTabClick={this.handleTabClick}
      ></SidebarContent>
    );
  }

  renderFirstChildren(list) {
    const { wrapperClassName } = this.props;
    const { activeTab } = this.state;

    return (
      <SidebarContent
        {...this.props}
        sidebarProps={{
          className: classNames("sidebar-main second", {
            show: activeTab.includes(list.id),
            [wrapperClassName]: wrapperClassName
          }),
          style: { height: this.getParentHeight() }
        }}
        headerContent={
          <div
            className="first-back-btn"
            onClick={() => this.handleBackClick()}
          >
            <AngleLeft />
            <span>{list.name}</span>
          </div>
        }
        options={list.children}
        handleTabClick={this.handleTabClick}
      >
        {data => data.children && this.renderSecondChildren(list, data)}
      </SidebarContent>
    );
  }

  render() {
    const {
      open,
      wrapperClassName,
      headerClassName,
      header,
      options
    } = this.props;
    return (
      <div id="react-sidebar" className="slidebar">
        <div
          className={classNames("sidebar-backdrop", { show: open })}
          onClick={this.handleBackdropClick}
        ></div>
        <SidebarContent
          {...this.props}
          sidebarProps={{
            id: "sidebar-parent",
            className: classNames("sidebar-main", {
              show: open,
              [wrapperClassName]: wrapperClassName
            })
          }}
          headerContent={
            typeof header === "string" ? (
              <div
                className={`sidebar-header ${classNames({
                  [headerClassName]: headerClassName
                })}`}
              >
                {header}
              </div>
            ) : (
              <div
                className={classNames({
                  [headerClassName]: headerClassName
                })}
              >
                {header}
              </div>
            )
          }
          options={options}
          handleTabClick={this.handleTabClick}
        >
          {list => list.children && this.renderFirstChildren(list)}
        </SidebarContent>
      </div>
    );
  }
}

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node
  ]),
  persist: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  onClose: PropTypes.func,
  onItemClick: PropTypes.func,
  onBackClick: PropTypes.func
};

Sidebar.defaultProps = {
  persist: false
};

export default Sidebar;

const SidebarContent = props => {
  const {
    sidebarProps,
    headerContent,
    options,
    children,
    handleTabClick
  } = props;
  return (
    <div {...sidebarProps}>
      <div className="sidebar-main-content">
        {headerContent}
        <div className="sidebar-body">
          {options.map((data, index) => {
            return (
              <Fragment key={index}>
                {!(!!data.hideBorder || index === 0) && (
                  <hr className="section-seprator" />
                )}
                {data.title && (
                  <div className="section-heading">
                    {data.titleIcon && data.titleIcon}
                    <span className={classNames({ text: data.titleIcon })}>
                      {data.title}
                    </span>
                  </div>
                )}
                <ul>
                  {data.content.map((list, index) => {
                    return (
                      <Fragment key={index}>
                        {list.to && !list.children && !list.disabled ? (
                          <a href={list.to}>
                            <li
                              className={classNames({
                                disabled: list.disabled
                              })}
                              onClick={() => handleTabClick(list)}
                            >
                              <span className="flex-align-center">
                                {list.icon && list.icon}
                                <span>{list.name}</span>
                              </span>
                              {children && list.children && <AngleRight />}
                            </li>
                          </a>
                        ) : (
                          <li
                            className={classNames({ disabled: list.disabled })}
                            onClick={() => handleTabClick(list)}
                          >
                            <span className="flex-align-center">
                              {list.icon && list.icon}
                              <span>{list.name}</span>
                            </span>
                            {children && list.children && <AngleRight />}
                          </li>
                        )}
                        {children && children(list)}
                      </Fragment>
                    );
                  })}
                </ul>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const AngleRight = props => (
  <svg
    width="12px"
    height="12px"
    viewBox="0 0 8 13"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <title>Icon</title>
    <desc>Created with Sketch.</desc>
    <g
      id="Symbols"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <g id="Icon/Arrow/Right/Gray" fill="#898989">
        <g id="icon/Arrow/Right/Gray">
          <polygon
            id="Icon"
            points="0 11.4725 4.94466937 6.5 0 1.5275 1.52226721 0 8 6.5 1.52226721 13"
          ></polygon>
        </g>
      </g>
    </g>
  </svg>
);

const AngleLeft = props => (
  <svg
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="10px"
    height="10px"
    viewBox="0 0 548.797 548.797"
    xmlSpace="preserve"
  >
    <g>
      <g>
        <path
          d="M476.249,20.818c-13.855-21.23-42.283-27.203-63.525-13.354l-304.904,199.01c-27.185,16.01-42.742,40.692-42.742,67.92
			c0,27.228,15.557,51.903,42.742,67.926l304.904,199.004c7.748,5.056,16.445,7.473,25.049,7.473
			c14.982,0,29.682-7.332,38.477-20.814c13.861-21.229,7.883-49.67-13.348-63.525L171.705,274.395l291.196-190.05
			C484.131,70.488,490.104,42.049,476.249,20.818z"
        />
      </g>
    </g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
  </svg>
);
