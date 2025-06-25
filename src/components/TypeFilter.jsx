import '../styles/TypeFilter.css'

function TypeFilter ({name, options}) {
    return (
        <div className='TypeFilterContainer'>
            <h2>{name}:</h2>
            {options.map((option, id) => 
                <div
                    key={id}
                    className='CheckBox'
                >
                    <input type="checkbox" id={option} name={option} />
                    <label htmlFor={option}>{option}</label>
                </div>
            )}
        </div>
    )
}

export { TypeFilter }