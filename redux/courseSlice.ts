import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type Course = {
    id:string,
    title:string,
    description:string,
    description_more:string,
    price:number,
    category:string,
    imageUrl:string
}

interface CourseState{
    courses:Course[],
}

const initialState:CourseState= {
    courses:[],
}

const courseSlice = createSlice({
    name:"course",
    initialState,
    reducers:{
        addCourse(state,action:PayloadAction<Course>){
            state.courses.push(action.payload)
        },
        setCourses(state,action:PayloadAction<Course[]>){
            state.courses = action.payload
        },
        deleteCourse(state,action:PayloadAction<string>){
            state.courses = state.courses.filter(course => course.id !== action.payload)
        },
        editCourse(state,action:PayloadAction<Course>){
            state.courses = state.courses.map(course => course.id === action.payload.id ? action.payload : course)
        }
    }
})


export const {addCourse,deleteCourse,editCourse,setCourses} = courseSlice.actions;
export default courseSlice.reducer