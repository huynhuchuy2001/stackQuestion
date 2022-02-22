import React from "react";
import { useRouter } from 'next/router'
const Panginations = ({
    currentPage,
    totalPage
}) =>{
    const router = useRouter()
    const range = 5;
    const handlePage = async (e) => {
    
      const currentPath = router.pathname;
      const currentQuery = router.query;
  
      currentQuery.pagee = e;
      router.push({
        pathname: currentPath,
        query: currentQuery
      })
    }
    const handleChangePage = async (e) => {
      const i = Number(e.target.attributes.num.value);
      const currentPath = router.pathname;
      const currentQuery = router.query;
  
      currentQuery.pagee = i === 1 ? currentPage - 1 : currentPage + 1;
      router.push({
        pathname: currentPath,
        query: currentQuery
      })
    }
    const showPagination = (e) => {
        var page = [];
        var result = '';
        var start = 1;
        var end = totalPage;  
          if(currentPage >= range){    
              if(currentPage + 2 < e ){
                start = currentPage - 2;
                end = currentPage + 2;
              }else{
                  start = e - 4;
                  end = e;
              }       
          }else if(e > range){
              end = range;
          }
          for (let i = start; i <= end; i++) {    
            page.push(Number(i))
          }   
        result = page.length > 0 ? page.map((item, index) => {
        
          return <li key={index} className={
            currentPage >= range ? 
          index * 0 + item === currentPage ?
             'hightLight' :
              '' :
               index + 1 === currentPage ?
                'hightLight' : 
                ''
              } onClick={() => {handlePage(currentPage >= range ?  index * 0 + item : index + 1 )}}>{item}</li>
        })
          : '';
        return result;
      }
         
    return(
        <>
         { totalPage > 1 ?
        <div className="pagein_body">
          <div className="inside">
            {
              currentPage === 1 || currentPage === 0 ? '' : <i className='bx bxs-left-arrow' num="1" onClick={handleChangePage}></i>
            }
            {
              totalPage > range ? currentPage  > range - 1  ? <span className='more_page' onClick={() => handlePage(1)}>1</span>:'':''
            }
            {
              totalPage > range ? currentPage  > range - 1 ? <span className='more_page'>...</span>:'':''
            }
            <ul className="paginationBttns">
              {
                showPagination(totalPage)
              }
            </ul>
            {
              totalPage > range ?  currentPage + 2 < totalPage ? <span className='more_page'>...</span>:'':''
            }
            {
              totalPage > range ? currentPage + 2 < totalPage ? <span className='totalPage more_page' onClick={() => handlePage(totalPage)}>{totalPage}</span>:'':''
            }
            {            
              currentPage === totalPage || totalPage === 0 ? '' : <i className='bx bxs-right-arrow' num="2" onClick={handleChangePage}></i>
            }

          </div>
        </div>
        :
        ''
      }
        </>
    )
}
export default Panginations;