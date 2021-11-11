import React from "react";
import Animate from "animate.css-react";
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

const getSuggestionValue = issuers => issuers;

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
      words: [],
      value: "",
      suggestions: []
    };
  }

  onClickHandler = () => {
    this.setState({ openCalendar: !this.state.openCalendar });
  };

  componentDidMount() {
    this.fetchAPI();
  }

  onChangeIssuer = value => {
    this.setState({ inputIssuer: value });
  };

  schools = value => {
    APIClient.POST(
      "/api/marketplace/school/autocomplete",
      { input_word: value },
      data => {
        this.setState({ words: data.words });
      }
    );
  };

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    this.schools(value);

    return inputLength === 0
      ? []
      : this.state.words.filter(
          issuer => issuer.toLowerCase().slice(0, inputLength) === inputValue
        );
  };
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
    let urlString =
      "/marketplace/tickets?date=2020-03-10&issuer=aya&instrument=PF";
  }

  onClick = () => {
    document.location.href =
      "/marketplace/tickets?date=2020-03-10&issuer=aya&instrument=PF";
  };

  render() {
    const { t } = this.props;

    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "教室名",
      value,
      onChange: this.onChange
    };

    return (
      <>
        <BookingContainer>
          <Animate appear="fadeIn" durationAppear={1000} component="div">
            <ConditionInputPanel>
              <HeadTitle>レッスンを探す</HeadTitle>

              <Label>日にち</Label>
              <Input type="date" name="s" defaultValue={this.state.inputDate} />

              {this.state.openCalendar && (
                <Calendar onChange={this.onChange} value={this.state.date} />
              )}

              <Label>教室</Label>

              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                renderInputComponent={renderInputComponent}
                inputProps={inputProps}
              />

              <Label>楽器</Label>
              <Select>
                <option value="PF">ピアノ</option>
                <option value="EL">エレクトーン</option>
                <option value="VL">バイオリン</option>
                <option value="PO">パイプオルガン</option>
              </Select>

              <PositioningButton onClick={this.onClick}>
                Search
              </PositioningButton>
            </ConditionInputPanel>
          </Animate>
        </BookingContainer>
      </>
    );
  }
}

export default App;
