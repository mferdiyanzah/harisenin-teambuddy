import axios from "axios";

const baseUrl = 'https://the-trivia-api.com/api/'

const getCategories = () => {
    return axios.get(baseUrl + 'categories')
}

const getQuestions = (categories: string, difficulty: string) => {
    return axios.get(`${baseUrl}questions?categories=${categories}&difficulty=${difficulty}&limit=5`)
}

const quizServices = { getCategories, getQuestions }

export default quizServices