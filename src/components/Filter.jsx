import { TypeFilter } from './TypeFilter'
import '../styles/Filter.css'

function Filter () {
    return (
        <div className='FilterContainer'>
            <TypeFilter 
                name='Especialidad'
                options={["Perdida de peso", "Movilidad reducida", "Principiantes", "Fitness emocional" ]}
            />
            <TypeFilter 
                name='Genero'
                options={["Hombre", "Mujer" ]}
            />
            <TypeFilter 
                name='Especialidad'
                options={["Español", "Ingeles"]}
            />
            <TypeFilter 
                name='Modalidad'
                options={["Presencial", "Online", "Hibrido" ]}
            />
        </div>
    )
}

export { Filter }