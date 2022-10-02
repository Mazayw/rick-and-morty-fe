// import searchIcon from './icons/search.svg';
// import searchIcon from '.1./icons/search.svg';
// import { ReactComponent as YourSvg } from './icons/search.svg';
import styles from './styles.module.scss';
import React, { PureComponent } from 'react';

export default class Search extends PureComponent<
  { onChangeSearch: (text: string) => void },
  { searchWord: string }
> {
  constructor(props: { onChangeSearch: (text: string) => void }) {
    super(props);
    this.state = { searchWord: '' };

    this.inputHandler = this.inputHandler.bind(this);
  }

  componentDidMount() {
    const value = localStorage.getItem('search');
    this.props.onChangeSearch(value ? value : '');
    this.setState({ searchWord: value ? value : '' });
  }

  componentWillUnmount() {
    localStorage.setItem('search', this.state.searchWord);
  }

  inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    this.setState({ searchWord: value });
    localStorage.setItem('search', value);
    this.props.onChangeSearch(e.target.value);
  }

  render() {
    return (
      <div className={styles['search-wrapper']}>
        <input
          className={styles.search}
          type="search"
          value={this.state.searchWord}
          onChange={this.inputHandler}
          placeholder="Search"
          name="search"
        />
        <img src="./icons/search.svg" alt="Search icon" className={styles.icon} />
      </div>
    );
  }
}
