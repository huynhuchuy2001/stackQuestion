import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { publicFetch } from '../util/fetcher'

import Layout from '../components/layout'
import QuestionWrapper from '../components/question/question-wrapper'
import QuestionStats from '../components/question/question-stats'
import QuestionSummary from '../components/question/question-summary'
import PageTitle from '../components/page-title'
import ButtonGroup from '../components/button-group'
import { Spinner } from '../components/icons'

const HomePage = () => {
  const router = useRouter()

  const [questions, setQuestions] = useState(null)
  const [sortType, setSortType] = useState('Votes')
  const [totalPage, setTotalPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const range = 5;
  useEffect(() => {
    var request = {
      params: {
        requestType:sortType,
        page: router.query.pagee ? router.query.pagee : 1,
        size: 2
      }
    }
    const fetchQuestion = async () => {
      const data = await publicFetch.get('/question', request)
      setQuestions(data.data.data)
      setTotalPage(data.data.pageNum)
      setCurrentPage(data.data.currentPage)
 
    }

    const fetchQuestionByWord = async () => {
      const { data } = await publicFetch.get(`/question/find/${router.query.keyWord}`)
      setQuestions(data)
    }
    const fetchQuestionByTag = async () => {
      const { data } = await publicFetch.get(`/questions/${router.query.tag}`)
      setQuestions(data)
    }

    if (router.query.tag) {
      fetchQuestionByTag()
    } else if (router.query.keyWord) {
      fetchQuestionByWord()
    }
    else {
      fetchQuestion()
    }
  }, [router.query.tag, router.query.keyWord, router.query.pagee,sortType])
  
/*   const handleSorting = () => {
    
    switch (sortType) {
      case 'Votes':
        {
          sortQuestionByType(sortType)
        }
        break;
        return (a, b) => b.score - a.score 
      case 'Views':
        return (a, b) => b.views - a.views
      case 'Newest':
        return (a, b) => new Date(b.created) - new Date(a.created)
      case 'Oldest':
        return (a, b) => new Date(a.created) - new Date(b.created)
      default:
        break
    }
  } */
  
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
    var end = range;
   
      if(currentPage > range){    
          if(currentPage + 2 < totalPage ){
            start = currentPage - 2;
            end = currentPage + 2;
          }else{
            start = totalPage - 3;
            end = totalPage;
          }
         
      }
      console.log(start)
      for (let i = start; i <= end; i++) {    
        page.push(Number(i))
      }
    
    
    
   
    result = page.length > 0 ? page.map((item, index) => {

      return <li key={index} className={currentPage > range ? currentPage - 2 + index === currentPage ? 'hightLight' : '' : index + 1 === currentPage ? 'hightLight' : ''} onClick={() => {handlePage(currentPage > range ? currentPage - 2 + index : index + 1 )}}>{item}</li>
    })
      : '';
    return result;
  }
  return (
    <Layout>
      <Head>
        <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet' />
        <title>
          {router.query.tag ? router.query.tag : 'Questions'} - Clone of
          Stackoverflow
        </title>
      </Head>

      <PageTitle title={router.query.tag ? `Questions tagged [${router.query.tag}]` : 'All Questions'} button borderBottom={false} />

      <ButtonGroup
        borderBottom
        buttons={['Votes', 'Views', 'Newest', 'Oldest']}
        selected={sortType}
        setSelected={setSortType}
      />

      {!questions && (
        <div className="loading">
          <Spinner />
        </div>
      )}

      {questions ? questions    
        .map(
          ({
            id,
            votes,
            answers,
            views,
            title,
            text,
            tags,
            author,
            created,
            
          }) => (
            <QuestionWrapper key={id}>
              <QuestionStats
                voteCount={votes.length}
                answerCount={answers.length}
                view={views}
              />
              <QuestionSummary
                id={id}
                title={title}
                tags={tags}
                author={author}
                createdTime={created}
              >
                {text}
              </QuestionSummary>
            </QuestionWrapper>
          )
        ): ''}
      { totalPage > 1 ?
        <div className="pagein_body">
          <div className="inside">
            {
              currentPage === 1 || currentPage === 0 ? '' : <i className='bx bxs-left-arrow' num="1" onClick={handleChangePage}></i>
            }
            {
               currentPage - 2 > 2  ? <span className='more_page' onClick={() => handlePage(1)}>1</span>:''
            }
            {
               currentPage - 2 > 2 ? <span className='more_page'>...</span>:''
            }
            <ul className="paginationBttns">
              {
                showPagination(totalPage)
              }
            </ul>
            {
               currentPage + 2 < totalPage ? <span className='more_page'>...</span>:''
            }
            {
               currentPage + 2 < totalPage ? <span className='totalPage more_page' onClick={() => handlePage(totalPage)}>{totalPage}</span>:''
            }
            {            
              currentPage === totalPage || totalPage === 0 ? '' : <i className='bx bxs-right-arrow' num="2" onClick={handleChangePage}></i>
            }

          </div>
        </div>
        :
        ''
      }

    </Layout>
  )
}

export default HomePage
