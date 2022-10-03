const FormInput = ({label, ...otherStuff})=>{
    return (
        <div className="group">
            <input className="form-input" {...otherStuff}/>
            {label && (<label className={`${otherStuff.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>)}
        </div>
    )
}

export default FormInput