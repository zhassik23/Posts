import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostIDPage = () => {
	const params = useParams();
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);

	const [fetchPostById, isLoading, error] = useFetching(async (id) => {
		const response = await PostService.getById(id)
		setPost(response.data);
  	});
	
	const [fetchComments, isCommentLoading, commentError] = useFetching(async (id) => {
		const response = await PostService.getCommentsByPostId(id)
		setComments(response.data);
  	});

	useEffect(() => {
		fetchPostById(params.id)
		fetchComments(params.id)
  	}, []);

	return (
		<div>
			<h1>You opened {params.id} post!</h1>
			{isLoading
            ? <Loader/>
            : <div>{post.id}. {post.title}</div>
         }
         
			<h1>Comments</h1>
			{isCommentLoading
            ? <Loader/>
            : <div>
               {comments.map(comm =>
						<div key={comm.id} className='comment'>
							<h5>{comm.email}</h5>
							<div>{comm.body}</div>
						</div>
            	)}
            </div>
         }
		</div>
	);
};

export default PostIDPage;