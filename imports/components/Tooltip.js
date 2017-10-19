import React from 'react';
import PropTypes from 'prop-types';

export default class Tooltip extends React.Component
{
    constructor ()
    {
        super();
        this.state = {
            isVisible: false,
        };
        this.timer;
    }

    componentWillUnmount ()
    {
        clearTimeout(this.timer);
    }

    handleMouseEnter ()
    {
        this.timer = setTimeout(() => {
            this.setState({
                isVisible: true
            });
        }, this.props.delayTime);
    }

    handleMouseLeave ()
    {
        clearTimeout(this.timer);
        this.setState({
            isVisible: false
        });
    }

    render ()
    {
        const isVisible = this.state.isVisible ? ' is-visible' : ' is-hidden';
        const className = `tooltip ${isVisible}`;

        return (
            <div
                className={className}
                onMouseEnter={this.handleMouseEnter.bind(this)}
                onMouseLeave={this.handleMouseLeave.bind(this)}>
                <span className="tooltip-label">{this.props.text}</span>

                {this.props.children}
            </div>
        );
    }
}

Tooltip.defaultProps = {
    delayTime: 1000
};

Tooltip.propTypes = {
    text: PropTypes.string.isRequired
};