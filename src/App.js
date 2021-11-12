import React from "react";
import { animated } from 'react-spring'
import { Input } from "./components/Input";
import { Select } from "./components/Select";
import Calendar from "react-calendar";
import Autosuggest from "react-autosuggest";
import { formatDate } from "./Fundation";
import {
  PositioningButton,
  ConditionInputPanel,
  Label,
  BookingContainer,
  HeadTitle
} from "./AppComponents";

const getSuggestionValue = suggestion => suggestion;

const renderInputComponent = inputProps => (
  <Input style={{ width: "100%" }} type="text" {...inputProps} />
);

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => <sapn>{suggestion}</sapn>;

// Page Componrnts
// ------------------------------------------------------------------------------
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCalendar: false,
      inputDate: formatDate(new Date(), "YYYY-MM-DD"),
      inputIssuer: "INPUT_ISSUER",
      inputInstrument: "",
      words: ["飲み会などの集団での食事", "仕事や授業などのミーティング", "２者でのお食事", "飲酒を伴うイベント", "旅行", "喫茶店・カフェでのお茶・お茶会", "お祭り", "この中のリストには該当する目的が見当たらない"],
      value: "",
      suggestions: []
    };
  }

  onClickHandler = () => {
    this.setState({ openCalendar: !this.state.openCalendar });
  };

  componentDidMount() {
  }

  onChangeIssuer = value => {
    this.setState({ inputIssuer: value });
  };

  evalInput(eTarget, input) {
    const inputArr = [];

    for (var i = 0; i < input.length; i++) {
      const tmp = input.slice(0, i + 1);
      inputArr.push(tmp);
    }

    for (var j = 0; j < input.length; j++) {
      const tmp = input.slice(input.length - j - 1, input.length);
      inputArr.push(tmp);
    }

    const einputArr = inputArr.filter(e => e.length >= 2);

    for(let i in einputArr){
      if (eTarget.indexOf(einputArr[i]) > -1) {
        return true;
      }
      return false;
    }
  }


  getSuggestions(value) {
    const inputValue = value.trim();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : this.state.words.filter(words => this.evalInput(words, value));
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  switchResult(date, issuer, inst) {
  }

  onClick = () => {
    alert('申し訳ございませんが、現在ABLサーバーとの通信ができません');
  };

  render() {

    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "ex. お食事, ミーティングなど",
      value,
      onChange: this.onChange
    };

    return (
      <>
        <BookingContainer>
          <animated.div>
            <ConditionInputPanel>
              <HeadTitle>@shotastageの日程を探す</HeadTitle>

              <Label>日にち</Label>
              <Input type="date" name="s" defaultValue={this.state.inputDate} />

              {this.state.openCalendar && (
                <Calendar onChange={this.onChange} value={this.state.date} />
              )}

              <Label>目的</Label>

              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                renderInputComponent={renderInputComponent}
                inputProps={inputProps}
              />

              <Label>緊急度</Label>
              <Select>
                <option value="PF">急</option>
                <option value="EL">やや急</option>
                <option value="VL">普通</option>
                <option value="PO">いつでもいい</option>
              </Select>

              <PositioningButton onClick={this.onClick}>
                Search
              </PositioningButton>
            </ConditionInputPanel>
          </animated.div>
        </BookingContainer>
      </>
    );
  }
}

export default App;
