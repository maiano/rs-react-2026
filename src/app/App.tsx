import React from 'react';
import { SearchBar } from '@/features/search';
import { CharacterList } from '@/widgets/character-list/ui/character-list';
import { fetchPeople, type Person } from '@/shared/api/sw-api';

type Props = object;

type State = {
  items: Person[];
  loading: boolean;
  error: string | null;
};

export class App extends React.Component<Props, State> {
  state: State = {
    items: [],
    loading: false,
    error: null,
  };

  private requestId = 0;

  handleSearch = async (term: string) => {
    const currentRequest = ++this.requestId;

    this.setState({
      loading: true,
      error: null,
    });

    try {
      await new Promise((r) => setTimeout(r, 200));

      const data = await fetchPeople(term);

      if (currentRequest !== this.requestId) return;

      this.setState({
        items: data,
        loading: false,
      });
    } catch (err) {
      if (currentRequest !== this.requestId) return;

      this.setState({
        error: err instanceof Error ? err.message : 'Unknown error',
        loading: false,
      });
    }
  };

  render() {
    const { items, loading, error } = this.state;

    return (
      <div className="app-container py-8 space-y-6">
        <div className="p-4 border rounded-lg bg-card">
          <SearchBar onSearch={this.handleSearch} />
        </div>

        <div className="p-4 border rounded-lg bg-card min-h-75">
          {loading && <div className="text-muted-foreground">Loading...</div>}

          {!loading && error && <div className="text-destructive">{error}</div>}

          {!loading && !error && <CharacterList items={items} />}
        </div>
      </div>
    );
  }
}
