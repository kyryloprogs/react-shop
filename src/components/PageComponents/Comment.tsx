import { Typography, TextField, Button, InputLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import Icons from '../UtilsComponents/Icons';
import CommectBlock from './CommentBlock';
import instance from '../../config/axios';
import { useCookies } from 'react-cookie';

type CommentsType =
  [{
    id: number;
    user_id: number;
    comment: string;
    created_at: any;
    is_me: boolean;
  }];

type Props = {
  id: string;
};

const Comment = (props: Props) => {
  const [dateUP, setDateUP] = useState(false);
  const [newComment, setNewComment] = useState<string>('');
  const [comments, setComments] = useState<CommentsType>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [token] = useCookies(['bestproducts']);
  useEffect(() => {
    updateComments();
  }, [])

  const updateComments = async () => {
    try {
      const result = await instance.get(`/comments/${props.id}`, {
        headers: {
          Authorization: token.bestproducts,
        }
      });

      if (result) {
        setComments(result.data.comments);
        setIsAdmin(result.data.isAdmin);
      }
    } catch (error) {
      console.error('Error updating comments:', error);
    }
  }

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    const result = await instance.post('/comments', {
      comment: newComment,
      product_id: props.id
    }, {
      headers: {
        Authorization: token.bestproducts,
      }
    })
    result && setNewComment('');
    updateComments();
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await instance.delete(`/comments/${id}`, {
        headers: {
          Authorization: token.bestproducts,
        }
      })
  
      result && updateComments();
    } catch (e) {
      console.log("DELETE ERROR")
    }
    
  };

  const changeDir = () => {
    console.log(1)
    setDateUP(dateUP => !dateUP)
    if (comments) {
      comments.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();

        return dateUP ? dateA - dateB : dateB - dateA;
      });
    }

  };

  return (
    <div className="w-[90%] mx-auto">
      <div className='bg-extrumsPurple ml-[17px] w-[142px] mt-[62px] h-[46px] px-[11px] py-[9px] rounded-extrumsDefault text-white flex flex-row justify-center items-center'
        onClick={() => changeDir()} >
        <Icons.SvgSort />
        <Typography variant='buttonLower'>
          Price
        </Typography>
        {dateUP ? <Icons.SvgTop color='white' /> : <Icons.SvgBottom color='white' />}
      </div>
      <div style={{ width: "100%", marginTop: 64 }}>
        {comments && comments.map((e, id) => (
          <div key={id} className="flex justify-center w-[90%] h-[264px] mb-[40px]">
            <CommectBlock comment={e} />
            {isAdmin && (<div onClick={() => handleDelete(e.id)}><Typography variant='description'>X</Typography></div>)}
          </div>
        ))}
      </div>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        placeholder="Type your comment..."
        value={newComment}
        onChange={handleCommentChange}
        sx={{
          marginTop: 2,
          '& .MuiOutlinedInput-input': {
            fontFamily: 'Inter', 
            fontSize: '24px', 
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCommentSubmit}
        sx={{ marginTop: 2 }}
      >
        Submit
      </Button>
    </div>
  );
};

export default Comment;
