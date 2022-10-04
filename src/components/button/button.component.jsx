import './button.style.scss'

const BUTTON_TYPES_CLASSES = {
    inverted: 'inverted'
}

const Button = ({children, buttonType, ...otherStuff}) => {
    return (
        <button className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`} {...otherStuff}>{children}</button>
    )

}

export default Button