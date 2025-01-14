import './App.css';
import QuizContainer from "./components/QuizContainer";
import {Component} from "react";
import Header from "./components/Header";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./components/Home";
import Tests from "./components/Tests";
import TestPage from "./TestPage";
import {categories} from "./store/tests";

class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            quizzes: [],
            isLoading: true,
            selectedQuizId: 0,
            truthUser: false,
            myAnswers: [],
            options: {difficulty: '', category: categories[0].value, amount: 35}
        }
    }

    setSelectedQuiz = (id) => {
        this.setState({
            selectedQuizId: id
        })
    }

    setTruthUser = (val = false) => {
        this.setState({
            truthUser: val,
            isLoading: false
        })
    }

    setOptions = (options) => {
        this.setState({
            options,
            isLoading: true
        })
    }

    onCheckAnswer = () => {
        const {myAnswers, quizzes, selectedQuizId} = this.state
        const correctIndex = quizzes[selectedQuizId].variants.findIndex(variant => variant === quizzes[selectedQuizId].correct_answer)
        myAnswers[selectedQuizId].isSubmitted = true
        myAnswers[selectedQuizId].correctIndex = correctIndex
        myAnswers[selectedQuizId].isCorrect = myAnswers[selectedQuizId].answerIndex === correctIndex
        this.setState({
            myAnswers
        })
    }
    onQuizEnd = () => {
        const {myAnswers, quizzes} = this.state
        for (let i = 0; i < quizzes.length; i++) {
            if (!myAnswers[i].isSubmitted) {
                const correctIndex = quizzes[i].variants.findIndex(variant => variant === quizzes[i].correct_answer)
                myAnswers[i].isSubmitted = true
                myAnswers[i].correctIndex = correctIndex
                myAnswers[i].isCorrect = myAnswers[i].answerIndex === correctIndex
            }
        }
        this.setState({
            myAnswers
        })
    }

    setSelectAnswer = (answerId) => {
        const {myAnswers} = this.state
        myAnswers[this.state.selectedQuizId].answerIndex = answerId
        this.setState({
            myAnswers
        })
    }

    setData = (res) => {

        let quizzes = [...res.data]
        const myAnswers = new Array(quizzes.length)
        for (let i = 0; i < quizzes.length; i++) {
            quizzes[i].variants = [...quizzes[i].incorrect_answers, quizzes[i].correct_answer]
            this.shuffleArray(quizzes[i].variants)
            myAnswers[i] = {
                isSubmitted: false,
                isCorrect: false,
                answerIndex: -1
            }
        }
        this.setState({
            quizzes,
            isLoading: false,
            selectedQuizId: 0,
            myAnswers,
        })
    }

    update() {
        this.setState({
            quizzes: [],
            isLoading: true,
            selectedQuizId: 0,
            myAnswers: [],
            options: {...this.state.options}
        })
    }

    render() {
        const {quizzes, isLoading, selectedQuizId, myAnswers, options, truthUser} = this.state
        // if(!window.Telegram.WebApp.themeParams.bg_color)
        //     return <div>
        //         <p className="display-1 text-center mt-5">
        //             ;)
        //         </p>
        //     </div>


        return (
            <>
                <BrowserRouter>
                    <div className="App">
                        <Header currentIndex={selectedQuizId + 1}
                                onFinish={this.onQuizEnd}
                                forseUpdate={() => this.update()}
                                countQuizzes={quizzes.length}/>
                        <Switch>
                            <Route exact path="/">
                                <Home options={options}
                                      isLoading={isLoading}
                                      forseUpdate={() => this.update()}
                                      isUser={truthUser}
                                      setTruthUser={this.setTruthUser}
                                      onSubmit={this.setOptions}/>
                            </Route>
                            <Route exact path="/quiz">
                                <QuizContainer isLoading={isLoading}
                                               quiz={quizzes[selectedQuizId]}
                                               isUser={truthUser}
                                               currentIndex={selectedQuizId}
                                               myAnswers={myAnswers}
                                               options={options}
                                               forseUpdate={() => this.update()}
                                               onSelectQuiz={this.setSelectedQuiz}
                                               onSelectAnswer={this.setSelectAnswer}
                                               onCheckAnswer={this.onCheckAnswer}
                                               onFetch={this.setData} countQuizzes={quizzes.length}/>

                            </Route>

                            <Route exact path="/tests">
                                <Tests
                                    isUser={truthUser}/>
                            </Route>
                            <Route exact path="/test-page">
                                <TestPage/>
                            </Route>

                        </Switch>
                    </div>
                </BrowserRouter>
            </>
        );
    }

    shuffleArray(arr = []) {
        for (let i = 0; i < arr.length; i++) {
            let randomIndex = Math.floor(Math.random() * arr.length)
            let temp = arr[i];
            arr[i] = arr[randomIndex]
            arr[randomIndex] = temp
        }
    }
}

export default App;