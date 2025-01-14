import React, {useState} from 'react';
import {categories, store} from "../store/tests";

const Tests = ({isUser}) => {
    const [source, setSource] = useState("");

    return (
        <div className="container-fluid py-4">
            <select value={source} className="form-control mb-4" onChange={(e) => setSource(e.target.value)}>
                <option value="">All</option>
                {categories.map((category, index) => <option key={index}
                                                             value={category.value}>{category.name}</option>)}
            </select>
            {
                (source !== "" ? store.filter(obj => obj.category === source) : store).map((test, index) => <div
                    key={index} className="w-100 card mb-4">
                    <div className="card-header">
                        {index + 1}. {
                        test.question
                    }
                    </div>
                    <div className="card-body bg-light">
                        {
                            test.correct_answer
                        }
                    </div>
                </div>)
            }

        </div>
    );
};

export default Tests;