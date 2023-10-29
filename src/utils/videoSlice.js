import { createSlice } from "@reduxjs/toolkit";


const videoslice = createSlice({
    name: 'video',
    initialState : {
        videos : [],
        videoDetails : {}
    },
    reducers : {
        addVideos : (state,action) => {
            state.videos = action.payload
        },
        addVideoDetails : (state, action) => {
            state.videoDetails = action.payload
        }

    }
})

export const {addVideos, addVideoDetails} = videoslice.actions;

export default videoslice.reducer;
