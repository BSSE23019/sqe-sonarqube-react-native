/**
 * SHARED TEST CASES — Assignment 04, A Social Feed on the Dashboard
 *
 * These are the tests you can see and run as often as you like. They check only
 * what this assignment adds to your Lab 04 app: `postStore.js` and the Feed
 * screen. Lab 04's own six screens are your own work and are not marked again
 * here. A green run does not mean the assignment is finished — hidden tests
 * check rules the handout states that these do not.
 *
 * Nothing here checks colours, sizes or spacing. Styling is not marked.
 *
 * The Feed screen is rendered on its own, inside your own `AuthProvider`, with
 * no navigator: the storage is seeded first so a user is already logged in.
 */
import fs from 'fs';
import path from 'path';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react-native';

/**
 * AsyncStorage, in memory.
 *
 * The real module is native, and the grading workspace may not even have it
 * installed, so the suite brings its own: a plain object behind the calls the
 * app uses. `virtual: true` lets the mock stand in whether or not the package is
 * present. Every case starts from an empty store.
 */
const mockStore = {};
jest.mock(
  '@react-native-async-storage/async-storage',
  () => {
    const api = {
      getItem: jest.fn(async (key) => (key in mockStore ? mockStore[key] : null)),
      setItem: jest.fn(async (key, value) => {
        mockStore[key] = String(value);
      }),
      removeItem: jest.fn(async (key) => {
        delete mockStore[key];
      }),
    };
    return { __esModule: true, default: api, ...api };
  },
  { virtual: true },
);

/**
 * `useFocusEffect` needs a navigator around it, and there is none here. The
 * mock runs the callback the way the real hook does on a screen that is shown:
 * once, on mount. Also virtual, so the suite runs whether or not React
 * Navigation is installed in the grading workspace.
 */
jest.mock(
  '@react-navigation/native',
  () => ({
    __esModule: true,
    useFocusEffect: (callback) => require('react').useEffect(callback, [callback]),
    useIsFocused: () => true,
    useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn() }),
  }),
  { virtual: true },
);

beforeEach(() => {
  Object.keys(mockStore).forEach((key) => delete mockStore[key]);
});

/**
 * Finding your files.
 *
 * Each module is found by its **file name**, anywhere under `src/`, so
 * `src/screens/FeedScreen.js` and a flat `src/FeedScreen.js` grade identically.
 * Only the name is fixed.
 *
 * Resolution is lazy on purpose: a missing file fails the cases that need it,
 * and the Q0 case below names it, instead of stopping the whole suite loading.
 */
const SRC = path.join(__dirname, '..', 'src');

const findFile = (base, exts = ['.jsx', '.js']) => {
  const wanted = exts.map((ext) => `${base}${ext}`);
  const hits = [];
  const stack = [SRC];
  while (stack.length > 0) {
    const dir = stack.pop();
    let entries = [];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
      continue;
    }
    entries.forEach((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules') stack.push(full);
      } else if (wanted.includes(entry.name)) {
        hits.push(full);
      }
    });
  }
  if (hits.length === 0) {
    throw new Error(
      `could not find ${wanted.join(' or ')} anywhere under src/ — ` +
        'the file name is fixed even though the folder is not',
    );
  }
  hits.sort((a, b) => a.split(path.sep).length - b.split(path.sep).length);
  return hits[0];
};

const modules = {};
const load = (base, exts) => {
  if (!(base in modules)) {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    modules[base] = require(findFile(base, exts));
  }
  return modules[base];
};

const component = (base) => {
  const mod = load(base);
  return mod.default || mod;
};
const store = (name) => load('postStore')[name];

const MODULES = ['App', 'FeedScreen', 'postStore', 'FeedIcon'];

// ---------------------------------------------------------------------------
//  Seeding and rendering
// ---------------------------------------------------------------------------

const ALI = 'ali@mail.com';
const SARA = 'sara@mail.com';

const USERS = [
  { email: ALI, password: 'secret123', name: 'Ali Raza', dob: '', gender: '', createdAt: 1 },
  { email: SARA, password: 'secret123', name: 'Sara Malik', dob: '', gender: '', createdAt: 2 },
];

const post = (id, authorEmail, text, likes = [], createdAt = 1000) => ({
  id,
  authorEmail,
  text,
  likes,
  createdAt,
});

// `users` is a JSON array and `session` the plain email, exactly as Lab 04
// saves them, so your own AuthContext restores a logged-in user from it.
const seed = ({ posts = null, session = ALI } = {}) => {
  mockStore.users = JSON.stringify(USERS);
  if (session) mockStore.session = session;
  if (posts) mockStore.posts = JSON.stringify(posts);
};

const savedPosts = () => (mockStore.posts ? JSON.parse(mockStore.posts) : []);

const settle = async () => {
  await act(async () => {});
  await act(async () => {});
};

const renderFeed = async (options) => {
  seed(options);
  const { AuthProvider } = load('AuthContext');
  const FeedScreen = component('FeedScreen');
  await render(
    <AuthProvider>
      <FeedScreen />
    </AuthProvider>,
  );
  await settle();
};

// `toHaveTextContent` matches the WHOLE string in this version, and a readout
// built from several children ("0", "/", "280") arrives as an array, so the
// children are flattened and compared as one string instead.
const textOf = (testID) => {
  const flatten = (node) =>
    []
      .concat(node)
      .map((child) =>
        child && child.props ? flatten(child.props.children) : child === null ? '' : String(child),
      )
      .join('');
  return flatten(screen.getByTestId(testID).props.children);
};

const type = async (value) => {
  await fireEvent.changeText(screen.getByTestId('feed-input'), value);
  await settle();
};

const pressPost = async () => {
  await fireEvent.press(screen.getByTestId('feed-post'));
  await settle();
};

// Both suites open with this. If only this case fails, the workspace is wrong,
// not your submission: `render` and `fireEvent` are ASYNC in this version, and
// every helper above awaits them.
test('environment: the async testing-library renders the feed', async () => {
  await renderFeed();
  expect(screen.toJSON()).toBeTruthy();
});

describe('Q0 the files', () => {
  test('every module the grader needs is somewhere under src/, by name', async () => {
    const missing = MODULES.filter((base) => {
      try {
        findFile(base);
        return false;
      } catch (e) {
        return true;
      }
    });
    expect(missing).toEqual([]);
  });
});

describe('Q1 postStore', () => {
  test('getPosts returns an empty list when nothing has been saved', async () => {
    expect(await store('getPosts')()).toEqual([]);
  });

  test('addPost saves one post carrying the five fields', async () => {
    await store('addPost')(ALI, 'Hello from the lab');
    const posts = savedPosts();
    expect(posts).toHaveLength(1);
    expect(posts[0].authorEmail).toBe(ALI);
    expect(posts[0].text).toBe('Hello from the lab');
    expect(posts[0].likes).toEqual([]);
    expect(typeof posts[0].id).toBe('string');
    expect(typeof posts[0].createdAt).toBe('number');
  });

  test('addPost appends, so the saved array stays oldest first', async () => {
    await store('addPost')(ALI, 'first');
    await store('addPost')(SARA, 'second');
    expect(savedPosts().map((p) => p.text)).toEqual(['first', 'second']);
  });

  test('addPost returns the new list, not just the one post', async () => {
    await store('addPost')(ALI, 'first');
    const returned = await store('addPost')(SARA, 'second');
    expect(Array.isArray(returned)).toBe(true);
    expect(returned).toHaveLength(2);
  });

  test('toggleLike adds the email, and a second call takes it away', async () => {
    seed({ posts: [post('p1', SARA, 'hi')] });
    await store('toggleLike')('p1', ALI);
    expect(savedPosts()[0].likes).toEqual([ALI]);
    await store('toggleLike')('p1', ALI);
    expect(savedPosts()[0].likes).toEqual([]);
  });

  test('deletePost removes a post its own author wrote', async () => {
    seed({ posts: [post('p1', ALI, 'mine'), post('p2', SARA, 'theirs')] });
    await store('deletePost')('p1', ALI);
    expect(savedPosts().map((p) => p.id)).toEqual(['p2']);
  });

  test('deletePost refuses somebody else’s post and leaves it saved', async () => {
    seed({ posts: [post('p1', SARA, 'theirs')] });
    await expect(store('deletePost')('p1', ALI)).rejects.toThrow();
    expect(savedPosts()).toHaveLength(1);
  });
});

describe('Q2 the Feed screen', () => {
  test('the screen, the write box, the count and the Post button are all there', async () => {
    await renderFeed();
    expect(screen.getByTestId('feed-screen')).toBeTruthy();
    expect(screen.getByTestId('feed-input')).toBeTruthy();
    expect(screen.getByTestId('feed-count')).toBeTruthy();
    expect(screen.getByTestId('feed-post')).toBeTruthy();
  });

  test('with nothing saved it shows feed-empty', async () => {
    await renderFeed();
    expect(screen.getByTestId('feed-empty')).toBeTruthy();
  });

  test('feed-count reads the letters typed and the limit', async () => {
    await renderFeed();
    expect(textOf('feed-count')).toBe('0/280');
    await type('hello');
    expect(textOf('feed-count')).toBe('5/280');
  });

  test('posting saves the text and shows it as a card', async () => {
    await renderFeed();
    await type('Anyone up for the lab demo?');
    await pressPost();
    expect(savedPosts()).toHaveLength(1);
    expect(screen.getByTestId('post-text')).toBeTruthy();
    expect(textOf('post-text')).toBe('Anyone up for the lab demo?');
  });

  test('posting an empty box shows feed-error and saves nothing', async () => {
    await renderFeed();
    await pressPost();
    expect(screen.getByTestId('feed-error')).toBeTruthy();
    expect(savedPosts()).toHaveLength(0);
  });

  test('a saved post renders its card and its like count', async () => {
    await renderFeed({ posts: [post('p1', SARA, 'First post', [ALI])] });
    expect(screen.getByTestId('post-p1')).toBeTruthy();
    expect(textOf('post-likes-p1')).toContain('1 like');
  });

  test('tapping the heart changes the count', async () => {
    await renderFeed({ posts: [post('p1', SARA, 'First post')] });
    expect(textOf('post-likes-p1')).toContain('0 likes');
    await fireEvent.press(screen.getByTestId('post-like-p1'));
    await settle();
    expect(textOf('post-likes-p1')).toContain('1 like');
  });

  test('Delete is on your own post and not on anybody else’s', async () => {
    await renderFeed({
      posts: [post('mine', ALI, 'my post', [], 2000), post('theirs', SARA, 'their post', [], 1000)],
    });
    expect(screen.getByTestId('post-delete-mine')).toBeTruthy();
    expect(screen.queryByTestId('post-delete-theirs')).toBeNull();
  });

  test('the newest post is shown first', async () => {
    await renderFeed({
      posts: [post('old', ALI, 'older one', [], 1000), post('new', ALI, 'newer one', [], 5000)],
    });
    const ids = screen
      .getAllByTestId(/^post-(old|new)$/)
      .map((node) => node.props.testID);
    expect(ids).toEqual(['post-new', 'post-old']);
  });
});
