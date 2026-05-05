import React from 'react';
import { SearchBar } from '@/features/search';
import { CharacterList } from '@/widgets/character-list/ui/character-list';
import { fetchPeople, type Person } from '@/shared/api/sw-api';
import { Button } from '@/shared/ui';

type Props = object;

type State = {
  items: Person[];
  loading: boolean;
  error: string | null;
  shouldThrowError: boolean;
};

export class App extends React.Component<Props, State> {
  state: State = {
    items: [],
    loading: false,
    error: null,
    shouldThrowError: false,
  };

  private requestId = 0;

  throwError = () => {
    this.setState({ shouldThrowError: true });
  };

  handleSearch = async (term: string) => {
    const currentRequest = ++this.requestId;

    this.setState({
      loading: true,
      error: null,
    });

    try {
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
    const { items, loading, error, shouldThrowError } = this.state;

    if (shouldThrowError) {
      throw new Error('Test error');
    }

    return (
      <div className="app-container py-8 space-y-6">
        <div className="p-4 border rounded-lg bg-card">
          <SearchBar onSearch={this.handleSearch} loading={loading} />
        </div>

        <div className="p-4 border rounded-lg bg-card min-h-75">
          {loading && <div className="text-muted-foreground">Loading...</div>}

          {!loading && error && <div className="text-destructive">{error}</div>}

          {!loading && !error && <CharacterList items={items} />}

          <div className="mt-4 flex justify-end">
            <Button
              variant="secondary"
              size="sm"
              onClick={this.throwError}
              className="text-destructive hover:text-destructive"
            >
              Trigger Error
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
