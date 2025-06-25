import '../styles/SortFilter.css'

function SortFilter () {
    return (
        <div className='SortFilterContainer'>
            <select name="order" id="order">
                <option value="Name">Name</option>
                <option value="Price_Low">Price: Low to High</option>
                <option value="Price_High">Price: High to Low</option>
            </select>
        </div>
    )
}

export { SortFilter }
