import { useContext } from 'react'
import '../styles/MainView.css'
import { Filter } from '../components/Filter'
import { Navbar } from '../components/Navbar'
import { SubBar } from '../components/SubBar'
import { ResultTable } from '../components/ResultTable'
import { SearchContext } from '../utils/context/SearchContext'
import { Modal } from '../components/Modal'

function MainView() {
  const { isOpen } = useContext(SearchContext);
  return (
    <>
      <Navbar />
      <SubBar />
      <div className='content-ResultandFilter'>
        <Filter/>
        <ResultTable />
      </div>
      {isOpen && <Modal />}
    </>
  )
}

export default MainView
