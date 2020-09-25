import React, { FunctionComponent } from 'react'

type propsData = {
    results: any,
    changePage: any
}
export const NytResults: FunctionComponent<propsData> = (props) => {

    console.log("Results:", props.results)
    return (
        <div>
            {props.results.map((result: any) => {
                return (
                    <div key={result._id}>
                        <h2>{result.headline.main}</h2>
                        {result.multimedia.length > 1 ?
                            <img alt="article" src={`http://www.nytimes.com/${result.multimedia[1].url}`} /> : ''}
                        <p>
                            {result.snippet}
                            <br />
                            {result.keywords.length > 0 ? 'Keywords:' : ''}
                        </p>
                        <ul>
                            <a href={result.web_url} ><button>Read it</button></a>
                        </ul>
                    </div>
                )
            })}
            <div>
                <button onClick={(e) => props.changePage(e, 'down')}>Previous 10</button>
                <button onClick={(e) => {
                    props.changePage(e, 'up')
                }}>Next 10</button>
            </div>
        </div>
        
    )
}
