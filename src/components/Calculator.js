import React from 'react';
import './../styles/Calculator.css';

const initialState = {
  currentVal: '0',
  formula: '',
  evaluated: false,
};

const endsWithOperator = /[-+x/]$/,
       endsWithNegative = /[/+x]-$/,
       isOperator = /[-+/x]/;


class Calculator extends React.Component {
  constructor(props){
    super(props);

    this.state = initialState

    this.handleClear = this.handleClear.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
  }

  handleClear() {
    this.setState(initialState);
  }

  handleOperator(e) {
    const { currentVal, formula, evaluated} = this.state;

    this.setState({
      formula:
        (formula === '' || evaluated) ?
          currentVal.concat(e.target.innerHTML) 
        : (endsWithOperator.test(formula) && isOperator.test(currentVal) && e.target.innerHTML === '-') ?
          formula.concat(e.target.innerHTML) 
        : (endsWithNegative.test(formula) && isOperator.test(currentVal)) ?
          formula.slice(0, -2).concat(e.target.innerHTML)  
        : (endsWithOperator.test(formula) && isOperator.test(currentVal)) ?
          formula.slice(0, -1).concat(e.target.innerHTML)  
        :
          formula.concat(currentVal,e.target.innerHTML),

      currentVal: e.target.innerHTML,
      evaluated: false,
    })
  }
  
  handleNumbers(e) {

    const {currentVal, evaluated} = this.state;

    evaluated === true ?
      this.setState({
        formula: '',
        currentVal: e.target.innerHTML,
        evaluated: false,
      })
    :
    currentVal === '0' ?
      this.setState({
        currentVal: e.target.innerHTML,
      })
    : isOperator.test(currentVal) ?
      this.setState({
        currentVal: e.target.innerHTML
      })
    :
      this.setState({
        currentVal: currentVal.concat(e.target.innerHTML),
      });
  }

  handleDecimal() {
    const {currentVal} = this.state;

    if (currentVal.indexOf('.') === -1) {
      this.setState({
        currentVal: currentVal.concat('.'),
      })
    }
  }

  handleEvaluate(e) {

    const {formula, currentVal} = this.state;

    const result = eval(formula.replace('x', '*').concat(currentVal));


    this.setState({
      formula: formula.concat(currentVal, e.target.innerHTML, result),
      currentVal: result.toString(),
      evaluated: true,
    })

  }


  render() {
    return (
      <div className="calculator calculator-grid">
        <div className="display">
          <div id="formula" className="formula">{this.state.formula}</div>
          <div id="display" className="output">{this.state.currentVal}</div>
        </div>
        <div id="clear" value="AC" className="clear center-content" onClick={this.handleClear}>AC</div>
        <div id="divide" value="/" onClick={this.handleOperator} className="grey-bg divide center-content">/</div>
        <div id="multiply" value="*" onClick={this.handleOperator} className="grey-bg multiply center-content">x</div>
        <div id="subtract" value="-" onClick={this.handleOperator} className="grey-bg subtract center-content">-</div>
        <div id="add" value="+" onClick={this.handleOperator} className="grey-bg add center-content">+</div>
        <div id="nine" value="9" onClick={this.handleNumbers}  className="dark-grey-bg nine center-content">9</div>
        <div id="eight" value="8" onClick={this.handleNumbers}  className="dark-grey-bg eight center-content">8</div>
        <div id="seven" value="7" onClick={this.handleNumbers}  className="dark-grey-bg seven center-content">7</div>
        <div id="six" value="6" onClick={this.handleNumbers}  className="dark-grey-bg six center-content">6</div>
        <div id="five" value="5" onClick={this.handleNumbers}  className="dark-grey-bg five center-content">5</div>
        <div id="four" value="4" onClick={this.handleNumbers}  className="dark-grey-bg four center-content">4</div>
        <div id="three" value="3" onClick={this.handleNumbers}  className="dark-grey-bg three center-content">3</div>
        <div id="two" value="2" onClick={this.handleNumbers}  className="dark-grey-bg two center-content">2</div>
        <div id="one" value="1" onClick={this.handleNumbers}  className="dark-grey-bg one center-content">1</div>
        <div id="zero" value="0" onClick={this.handleNumbers}  className="dark-grey-bg zero center-content">0</div>
        <div id="equals" value="=" onClick={this.handleEvaluate} className="dark-blue-bg equal center-content">=</div>
        <div id="decimal" value="." onClick={this.handleDecimal} className="dark-grey-bg decimal center-content">.</div>
        
      </div>
    );
  }
}

export default Calculator;

