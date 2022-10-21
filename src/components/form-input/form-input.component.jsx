const FormInput = ({label, ...otherStuff})=>{
    return (
        <div className="group">
            {label && (<label className={`${otherStuff.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>)}
            <input className="form-input" {...otherStuff}/>
        </div>
    )
}

export default FormInput