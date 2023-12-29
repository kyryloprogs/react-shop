import { Avatar, Grid, Typography } from '@mui/material'
import axios from 'axios'
import  { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import 'dayjs/locale/en';

type Props = {
    comment: {
        user_id: number,
        comment: string,
        created_at: any,
        is_me: boolean
    }
}

type UserData = {
    name: string,
    avatar: string
}

const CommentBlock = (props: Props) => {

    const comment = props.comment || "";
    const [userData, setUserData] = useState<UserData>({
        name: "",
        avatar: ""
    });
    const formattedDate = dayjs(comment.created_at).format('MMM DD, YYYY');
    const formattedTime = dayjs(comment.created_at, { locale: 'en' }).format('h:mm A');

    useEffect(() => {
        axios.get(`http://localhost:4500/users/${comment.user_id}`)
            .then(result => {
                setUserData(result.data)
                console.log(result.data)
            })
            .catch(e => {
                console.log("error")
            })
    }, [props])

    return (
        <div className={`border w-full rounded-[10px] ${comment.is_me ? "border-4 border-[#766ED3] " : " border-black "} h-[264px]`}>

            <Grid container spacing={2}>
                <Grid item xs={2} sx={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center" }}>
                    <Grid item xs={12} sx={{ marginTop: "14px" }} >
                        <Avatar
                            src={userData.avatar}
                            alt={userData.name}
                            sx={{ width: 95, height: 95 }}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: "18px" }}>
                        <Typography variant='description'>{comment.is_me ? "You" : userData.name}</Typography>
                    </Grid>

                    <Grid item xs={12} sx={{ marginTop: "19px" }}>
                        <Typography variant='description'>{formattedDate}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='description'>{formattedTime}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={10} sx={{ height: "214px", marginTop: "26px" }}>
                    <Typography variant='description'>{comment.comment}</Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default CommentBlock