import React, { FunctionComponent } from 'react'
import { Results  } from './Interfaces';

type propsData = {
    results: Results[],
    changePage: (a: React.MouseEvent<HTMLElement>, b: string) => void;
}
export const NytResults: FunctionComponent<propsData> = (props) => {

    console.log("Results:", props.results);
    return (
        <div>
            {props.results.map((result: Results) => {
                return (
                    <div key={result._id}>
                        <h2>{result.headline.main}</h2>
                        {result.multimedia.length > 1 ?
                            <img alt="article" src={`http://www.nytimes.com/${result.multimedia[1].url}`} /> : ''}
                        <p>
                            {result.snippet}
                            <br />
                            {result.keywords.length > 0 ? `Keywords:${result.keywords.map((r: any) => r.value)}`: ''}
                        </p>
                        <ul>
                            <a href={result.web_url} ><button>Read it</button></a>
                        </ul>
                    </div>
                )
            })}
            <div>
                <button onClick={(e) => props.changePage(e, 'down')}>Previous 10</button>
                <button onClick={(e): void => {props.changePage(e, 'up')}}>Next 10</button>
            </div>
        </div>
        
    )
}
