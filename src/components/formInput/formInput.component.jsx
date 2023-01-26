import './formInput.styles.scss';

const FormInput = ({icon, ...otherProps}) => {
    return (
        <div className="form-group">
            <div className='form-group__input'>
                <input {...otherProps} />
                {icon && (
                    <div className='form-group__svg'>{icon}</div>
                )}
            </div>
        </div>
    )
}

export default FormInput;