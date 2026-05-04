import React from 'react';
import { Button, Input } from '@/shared/ui';

type Props = {
  onSearch: (term: string) => void;
};

type State = {
  value: string;
  lastSubmitted: string;
};

const STORAGE_KEY = 'sw-search';

export class SearchBar extends React.Component<Props, State> {
  state: State = {
    value: '',
    lastSubmitted: '',
  };

  componentDidMount() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      this.setState({
        value: saved,
        lastSubmitted: saved,
      });

      this.props.onSearch(saved);
    } else {
      this.props.onSearch('');
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  handleSearch = () => {
    const trimmed = this.state.value.trim();

    if (trimmed === this.state.lastSubmitted) return;

    localStorage.setItem(STORAGE_KEY, trimmed);

    this.setState({
      lastSubmitted: trimmed,
      value: trimmed,
    });

    this.props.onSearch(trimmed);
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };

  render() {
    const { value } = this.state;

    return (
      <div className="flex items-center gap-3">
        <Input
          value={value}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Search characters..."
        />

        <Button onClick={this.handleSearch}>Search</Button>
      </div>
    );
  }
}
