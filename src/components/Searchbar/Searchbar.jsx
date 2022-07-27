import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import s from './SearchBar.module.css';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    query: '',
  };
  handlerInput = e => {
    const { value } = e.target;
    this.setState({ query: value });
  };

  handlerSubmit = e => {
    const { query } = this.state;

    if (!query.trim()) {
      toast.error('empty field', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    e.preventDefault();
    this.props.onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <header className={s.header}>
        <form className={s.form} onSubmit={this.handlerSubmit}>
          <button className={s.button} type="submit">
            <span>Search</span>
          </button>

          <input
            className={s.input}
            onChange={this.handlerInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
          />
        </form>
      </header>
    );
  }
}
