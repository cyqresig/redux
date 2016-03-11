import './style.css'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { createStore } from 'redux'
import Counter from './components/Counter'
import counter from './reducers'

import styleCollector from "./style-collector"

const store = createStore(counter)


module.exports = function(req, scriptFilename) {

	let css = styleCollector.collect();
  let html = ReactDOMServer.renderToString(
      <Counter
        value={store.getState()}
        onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
        onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
      />
	)

  console.log('render html = ' + html);

	return '<!DOCTYPE html><meta http-equiv="content-type" content="text/html;charset=utf-8"><meta http-equiv="X-UA-Compatible" content="IE=Edge">' + ReactDOMServer.renderToString(
      <html>
        <head>
          <title>Redux counter examplexxxxxxxxxxxx</title>
          <style id="server-side-style" dangerouslySetInnerHTML={{__html: css}} />
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{__html: html}}>
          </div>
          <script src={"dist/" + scriptFilename}></script>
        </body>
      </html>
	)
}
