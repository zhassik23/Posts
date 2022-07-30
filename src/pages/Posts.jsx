import React, {useEffect, useRef, useState} from 'react';
import Counter from "../components/Counter";
import Input from "../components/Input";
import ClassCounter from "../components/ClassCounter";
import PostService from "../API/PostService";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import MyModal from "../components/UI/MyModal/MyModal";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Loader from "../components/UI/Loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
	const [posts, setPosts] = useState([
		/* {id: 1, title: "Java Script", body: "JavaScript, often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS."},
		{id: 2, title: "Cascading Style Sheets", body: "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML."},
		{id: 3, title: "HyperText Markup Language", body: "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser."}, */
	]);
	
	const [filter, setFilter] = useState({sort: '', query: ''});
   const [modal, setModal] = useState(false);
   const [totalPages, setTotalPages] = useState(0);
   const [limit, setLimit] = useState(10);
   const [page, setPage] = useState(1);
	
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	const lastElement = useRef();
	
	const [fetchPosts, isPostsLoading, postsError] = useFetching(async (limit, page) => {
		const response = await PostService.getAll(limit, page);
		setPosts([...posts, ...response.data]);
		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPageCount(totalCount, limit));
  	});

	useObserver(lastElement, page < totalPages, isPostsLoading, () => {
		setPage(page + 1);
  })

	useEffect(() => {
		fetchPosts(limit, page)
  	}, [page, limit])
	
	const createPost = (newPost) => {
		setPosts([...posts, newPost])
		setModal(false)
  	}

  	// Получаем post из дочернего компонента
  	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id))
  	}

	const changePage = (page) => {
		setPage(page)
	}

	return (
		<div className="App">
			{/* <ClassCounter/>
			<Counter/>
			<Input/> */}
			
			{/* <PostItem post={{id: 1, title: "Java Script", body: "JavaScript, often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS."}}/> */}
			
			<MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
				Create an account
         </MyButton>

			<MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost}/>
         </MyModal>

			<hr />

			<PostFilter
            filter={filter}
            setFilter={setFilter}
         />

			<MySelect
            value={limit}
            onChange={value => setLimit(value)}
            defaultValue="Number of elements per page"
            options={[
               {value: 5, name: '5'},
               {value: 10, name: '10'},
               {value: 25, name: '25'},
               {value: -1, name: 'Show all'},
				]}
         />

			{postsError &&
				<h1>An error has occurred ${postsError}</h1>
         }

			<PostList remove={removePost} posts={sortedAndSearchedPosts} title="List of posts"/>
         <div ref={lastElement} style={{height: 20, background: 'red'}}/>

			{isPostsLoading &&
				<div className="Loader"><Loader/></div>
			}

			<Pagination 
				page={page}
				changePage={changePage}
				totalPages={totalPages}
			/>
		</div>
	);
}

export default Posts;