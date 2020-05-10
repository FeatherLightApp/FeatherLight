import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from '@vue/composition-api';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** B64 scalar type is a b64 encoded representation of bytes */
  B64: any;
};

export type AttenuatedMacaroon = {
   __typename?: 'AttenuatedMacaroon';
  caveats: Array<Caveat>;
  macaroon: Scalars['String'];
};

export type AttenuatedMacaroonResponse = AttenuatedMacaroon | Error;

export type AuthPayload = {
   __typename?: 'AuthPayload';
  access: Scalars['String'];
  refresh: Scalars['String'];
};


export type BalanceResponse = NodeBalance | Error;

export type BaseUser = {
  balance: Scalars['Int'];
  btcAddress: Scalars['String'];
  invoices: Array<Maybe<UserInvoice>>;
  payments: Array<Maybe<PaidInvoice>>;
  deposits: Array<Maybe<Deposit>>;
  feed: Array<Maybe<FeedItem>>;
  role: Role;
  created: Scalars['Int'];
};


export type BaseUserInvoicesArgs = {
  paid?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type BaseUserPaymentsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type BaseUserDepositsArgs = {
  confirmations?: Maybe<Scalars['Int']>;
};


export type BaseUserFeedArgs = {
  confirmations?: Maybe<Scalars['Int']>;
  paid?: Maybe<Scalars['Boolean']>;
  expired?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export enum Caveat {
  /**
   * Allows user to attenuate macaroon to only add invoices
   * this means user can give attenuated macaroon to others to add invoices on their behalf
   */
  AddInvoice = 'ADD_INVOICE',
  /** Used to limit the scope of token to only refreshMacaroon */
  Refresh = 'REFRESH'
}

export type Channel = {
   __typename?: 'Channel';
  active: Scalars['Boolean'];
  remotePubkey: Scalars['String'];
  channelPoint: Scalars['String'];
  chanId: Scalars['Int'];
  capacity: Scalars['Int'];
  localBalance: Scalars['Int'];
  remoteBalance: Scalars['Int'];
  commitFee: Scalars['Int'];
  unsettledBalance: Scalars['Int'];
  totalSatoshisSent: Scalars['Int'];
  totalSatoshisReceived: Scalars['Int'];
  private: Scalars['Boolean'];
  initiaor: Scalars['Boolean'];
  localChanReserveSat: Scalars['Int'];
  remoteChanReserveSat: Scalars['Int'];
  closeAddress: Scalars['String'];
};

export type ChannelBalance = {
   __typename?: 'ChannelBalance';
  balance: Scalars['Int'];
  pendingOpenBalance: Scalars['Int'];
};

export type ChannelPayload = {
   __typename?: 'ChannelPayload';
  openChannels: Array<Maybe<Channel>>;
  pendingChannels: PendingChannelsResponse;
};


export type ChannelPayloadOpenChannelsArgs = {
  active?: Maybe<Scalars['Boolean']>;
  inactive?: Maybe<Scalars['Boolean']>;
  public?: Maybe<Scalars['Boolean']>;
  private?: Maybe<Scalars['Boolean']>;
  peer?: Maybe<Scalars['B64']>;
};

export type ChannelResponse = ChannelPayload | Error;

/** partial implementation of [GRPC closed channel](https://api.lightning.community/?python#closedchannel) */
export type ClosedChannel = {
   __typename?: 'ClosedChannel';
  channel: PendingChannel;
  closingTxid: Scalars['String'];
};

export type DecodedInvoice = {
   __typename?: 'DecodedInvoice';
  destination?: Maybe<Scalars['String']>;
  paymentHash?: Maybe<Scalars['String']>;
  numSatoshis?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['Int']>;
  expiry?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  descriptionHash?: Maybe<Scalars['String']>;
  paymentAddr?: Maybe<Scalars['B64']>;
};

export type Deposit = {
   __typename?: 'Deposit';
  address: Scalars['String'];
  amount: Scalars['Int'];
  confirmations: Scalars['Int'];
  blockhash?: Maybe<Scalars['String']>;
  blockindex?: Maybe<Scalars['Int']>;
  blocktime?: Maybe<Scalars['Int']>;
  txid: Scalars['String'];
  time: Scalars['Int'];
  timereceived: Scalars['Int'];
  comment?: Maybe<Scalars['String']>;
};

export type Error = {
   __typename?: 'Error';
  errorType: ErrorType;
  message: Scalars['String'];
};

export enum ErrorType {
  NoCredentials = 'NoCredentials',
  AuthenticationError = 'AuthenticationError',
  PaymentError = 'PaymentError',
  RateLimited = 'RateLimited',
  InsufficientFunds = 'InsufficientFunds',
  InvalidInvoice = 'InvalidInvoice'
}

export type FeedItem = Deposit | PaidInvoice | UserInvoice;

/** partial implementation of [Force closed channel](https://api.lightning.community/?python#forceclosedchannel) */
export type ForceClosedChannel = {
   __typename?: 'ForceClosedChannel';
  channel: PendingChannel;
  closingTxid: Scalars['String'];
  limboBalance: Scalars['Int'];
  maturityHeight: Scalars['Int'];
  blocksTilMaturity: Scalars['Int'];
  recoveredBalance: Scalars['Int'];
};

export type InfoPayload = {
   __typename?: 'InfoPayload';
  version?: Maybe<Scalars['String']>;
  identityPubkey?: Maybe<Scalars['String']>;
  alias?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  numPendingChannels?: Maybe<Scalars['Int']>;
  numActiveChannel?: Maybe<Scalars['Int']>;
  numInactiveChannels?: Maybe<Scalars['Int']>;
  numPeers?: Maybe<Scalars['Int']>;
  blockHeight?: Maybe<Scalars['Int']>;
  blockHash?: Maybe<Scalars['String']>;
  bestHeaderTimestamp?: Maybe<Scalars['Int']>;
  syncedToChain?: Maybe<Scalars['Boolean']>;
  syncedToGraph?: Maybe<Scalars['Boolean']>;
  testnet?: Maybe<Scalars['Boolean']>;
};

export type Invoice = {
  amount: Scalars['Int'];
  expiry: Scalars['Int'];
  timestamp: Scalars['Int'];
  paymentRequest: Scalars['String'];
  paymentHash: Scalars['B64'];
  paymentPreimage: Scalars['B64'];
  memo: Scalars['String'];
};

export type MacaroonResponse = AuthPayload | Error;

export type Mutation = {
   __typename?: 'Mutation';
  /** Creates a new user of type Role, rate limited mutation */
  createUser: NewUserResponse;
  /**
   * Logs the user in issuing a full macaroon which does not expire 
   * and a limited refresh macaroon which expires in 7 days
   * Limited to 5 operations per day
   */
  login: MacaroonResponse;
  /** Nullifies the browsers cookie on response. If universal is true, rotate users macaroon secret, invalidation all sessions */
  logout?: Maybe<Error>;
  /** Issues new token payload: refresh token and full token */
  refreshMacaroons: MacaroonResponse;
  /** Bake a macaroon with additional caveats to limit account access */
  bakeMacaroon: AttenuatedMacaroonResponse;
  /**
   * Add an invoice for the user. If hash is specified then this creates a hold invoice
   * hold invoices must be resolved by calling resolveInvoice
   * hash should be passed in as a B64 encoded string
   * ADD_INVOICE action allows for macaroons to be attenuated to this route
   * i.e. a user may add the 'action = ADD_INVOICE' caveat to his access macaroon
   * and safely pass the macaroon to a third party, allowing them only to add new invoices
   * on the user's behalf
   */
  addInvoice: UserInvoiceResponse;
  /**
   * Resolves a previously set hold invoice, if resolution is SETTLE via should be passed the externally 
   * derived preimage, if reject, pass the original hash used to create the invoice
   */
  resolveInvoice: UserInvoiceResponse;
  /** Pay an invoice with a payment string, if this is a tip invoice then */
  payInvoice: PaidInvoiceResponse;
  /** Temporary mutation for testing */
  forceUser: UserResponse;
};


export type MutationCreateUserArgs = {
  role?: Maybe<Role>;
};


export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLogoutArgs = {
  universal?: Maybe<Scalars['Boolean']>;
};


export type MutationBakeMacaroonArgs = {
  caveats: Array<Caveat>;
};


export type MutationAddInvoiceArgs = {
  memo: Scalars['String'];
  amt: Scalars['Int'];
  hash?: Maybe<Scalars['B64']>;
};


export type MutationResolveInvoiceArgs = {
  resolution: Resolution;
  via: Scalars['B64'];
};


export type MutationPayInvoiceArgs = {
  invoice: Scalars['String'];
  amt?: Maybe<Scalars['Int']>;
};


export type MutationForceUserArgs = {
  user: Scalars['String'];
};

export type NewUser = BaseUser & {
   __typename?: 'NewUser';
  /** Password is only ever returned once, upon user creation. It is the clients responsiblity to store the password */
  password: Scalars['String'];
  /** Username is only ever returned once, upon user creation. It is the clients responsibility to store the username */
  username: Scalars['String'];
  /** Access token is a jwt which must be supplied in the header for authorized requests */
  tokens: AuthPayload;
  balance: Scalars['Int'];
  btcAddress: Scalars['String'];
  invoices: Array<Maybe<UserInvoice>>;
  payments: Array<Maybe<PaidInvoice>>;
  deposits: Array<Maybe<Deposit>>;
  feed: Array<Maybe<FeedItem>>;
  role: Role;
  created: Scalars['Int'];
};


export type NewUserInvoicesArgs = {
  paid?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type NewUserPaymentsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type NewUserDepositsArgs = {
  confirmations?: Maybe<Scalars['Int']>;
};


export type NewUserFeedArgs = {
  confirmations?: Maybe<Scalars['Int']>;
  paid?: Maybe<Scalars['Boolean']>;
  expired?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type NewUserResponse = NewUser | Error;

export type NodeBalance = {
   __typename?: 'NodeBalance';
  wallet: WalletBalance;
  channel: ChannelBalance;
  liquidity?: Maybe<NodeLiquidity>;
};

export type NodeLiquidity = {
   __typename?: 'NodeLiquidity';
  inbound: Scalars['Int'];
  outbound: Scalars['Int'];
};

export type PaidInvoice = Invoice & {
   __typename?: 'PaidInvoice';
  amount: Scalars['Int'];
  fee: Scalars['Int'];
  paidAt?: Maybe<Scalars['Int']>;
  expiry: Scalars['Int'];
  timestamp: Scalars['Int'];
  paymentRequest: Scalars['String'];
  paymentHash: Scalars['B64'];
  paymentPreimage: Scalars['B64'];
  memo: Scalars['String'];
};

/** Either error . or an invoice paid by this user (payee) */
export type PaidInvoiceResponse = PaidInvoice | Error;

export type PendingChannel = {
   __typename?: 'PendingChannel';
  remoteNodePub: Scalars['String'];
  channelPoint: Scalars['String'];
  capacity: Scalars['Int'];
  localBalance: Scalars['Int'];
  remoteBalance: Scalars['Int'];
  localChanReserveSat: Scalars['Int'];
  remoteChanReserveSat: Scalars['Int'];
};

/** [Pending Channels](https://api.lightning.community/?python#pendingchannels) */
export type PendingChannelsResponse = {
   __typename?: 'PendingChannelsResponse';
  totalLimboBalance: Scalars['Int'];
  pendingOpenChannels: Array<Maybe<PendingOpenChannel>>;
  pendingClosingChannels: Array<Maybe<ClosedChannel>>;
  pendingForceClosingChannels: Array<Maybe<ForceClosedChannel>>;
  waitingCloseChannels?: Maybe<Array<Maybe<WaitingCloseChannel>>>;
};

/** partially implemented [Pending Open Channel](https://api.lightning.community/?python#pendingopenchannel) */
export type PendingOpenChannel = {
   __typename?: 'PendingOpenChannel';
  channel: PendingChannel;
  confirmationHeight: Scalars['Int'];
  commitFee: Scalars['Int'];
};

export type Query = {
   __typename?: 'Query';
  me: UserResponse;
  nodeBalance: BalanceResponse;
  channels: ChannelResponse;
  decodeInvoice?: Maybe<DecodedInvoice>;
  info: InfoPayload;
};


export type QueryDecodeInvoiceArgs = {
  invoice: Scalars['String'];
};

/** Possible resolutions to resolve a hold invoice */
export enum Resolution {
  Settle = 'SETTLE',
  Reject = 'REJECT'
}

export enum Role {
  User = 'USER',
  Admin = 'ADMIN'
}

export type Subscription = {
   __typename?: 'Subscription';
  invoice: UserInvoiceResponse;
};

export type User = BaseUser & {
   __typename?: 'User';
  /** Access token is a jwt which must be supplied in the header for authorized requests */
  balance: Scalars['Int'];
  btcAddress: Scalars['String'];
  invoices: Array<Maybe<UserInvoice>>;
  payments: Array<Maybe<PaidInvoice>>;
  deposits: Array<Maybe<Deposit>>;
  feed: Array<Maybe<FeedItem>>;
  role: Role;
  created: Scalars['Int'];
};


export type UserInvoicesArgs = {
  paid?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type UserPaymentsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type UserDepositsArgs = {
  confirmations?: Maybe<Scalars['Int']>;
};


export type UserFeedArgs = {
  confirmations?: Maybe<Scalars['Int']>;
  paid?: Maybe<Scalars['Boolean']>;
  expired?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UserInvoice = Invoice & {
   __typename?: 'UserInvoice';
  amount: Scalars['Int'];
  paid: Scalars['Boolean'];
  paidAt?: Maybe<Scalars['Int']>;
  expiry: Scalars['Int'];
  timestamp: Scalars['Int'];
  paymentRequest: Scalars['String'];
  paymentHash: Scalars['B64'];
  paymentPreimage: Scalars['B64'];
  memo: Scalars['String'];
};

/** Either error or an invoice created by this user (payee) */
export type UserInvoiceResponse = UserInvoice | Error;

export type UserResponse = User | Error;

/** partial implementation [Waiting Close Channel](https://api.lightning.community/?python#waitingclosechannel) */
export type WaitingCloseChannel = {
   __typename?: 'WaitingCloseChannel';
  channel: PendingChannel;
  limboBalance: Scalars['Int'];
};

export type WalletBalance = {
   __typename?: 'WalletBalance';
  totalBalance: Scalars['Int'];
  confirmedBalance: Scalars['Int'];
  unconfirmedBalance: Scalars['Int'];
};

export type AddInvoiceMutationVariables = {
  amt: Scalars['Int'];
  memo: Scalars['String'];
};


export type AddInvoiceMutation = (
  { __typename?: 'Mutation' }
  & { addInvoice: (
    { __typename: 'UserInvoice' }
    & Pick<UserInvoice, 'amount' | 'paid' | 'paidAt' | 'expiry' | 'timestamp' | 'paymentRequest' | 'paymentHash' | 'paymentPreimage' | 'memo'>
  ) | (
    { __typename: 'Error' }
    & Pick<Error, 'errorType' | 'message'>
  ) }
);

export type BakeMacaroonMutationVariables = {};


export type BakeMacaroonMutation = (
  { __typename?: 'Mutation' }
  & { bakeMacaroon: (
    { __typename: 'AttenuatedMacaroon' }
    & Pick<AttenuatedMacaroon, 'macaroon'>
  ) | (
    { __typename: 'Error' }
    & Pick<Error, 'errorType' | 'message'>
  ) }
);

export type CreateUserMutationVariables = {
  role?: Maybe<Role>;
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename: 'NewUser' }
    & Pick<NewUser, 'username' | 'password'>
    & { tokens: (
      { __typename?: 'AuthPayload' }
      & Pick<AuthPayload, 'access' | 'refresh'>
    ) }
  ) | (
    { __typename: 'Error' }
    & Pick<Error, 'errorType' | 'message'>
  ) }
);

export type LoginMutationVariables = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename: 'AuthPayload' }
    & Pick<AuthPayload, 'refresh' | 'access'>
  ) | (
    { __typename: 'Error' }
    & Pick<Error, 'errorType' | 'message'>
  ) }
);

export type LogoutMutationVariables = {
  universal: Scalars['Boolean'];
};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout?: Maybe<(
    { __typename: 'Error' }
    & Pick<Error, 'errorType' | 'message'>
  )> }
);

export type RefreshMacaroonsMutationVariables = {};


export type RefreshMacaroonsMutation = (
  { __typename?: 'Mutation' }
  & { refreshMacaroons: (
    { __typename: 'AuthPayload' }
    & Pick<AuthPayload, 'refresh' | 'access'>
  ) | (
    { __typename: 'Error' }
    & Pick<Error, 'message' | 'errorType'>
  ) }
);

export type SendPaymentMutationVariables = {
  inv: Scalars['String'];
};


export type SendPaymentMutation = (
  { __typename?: 'Mutation' }
  & { payInvoice: (
    { __typename: 'PaidInvoice' }
    & Pick<PaidInvoice, 'amount' | 'fee' | 'paidAt' | 'expiry' | 'timestamp' | 'paymentRequest' | 'paymentHash' | 'paymentPreimage' | 'memo'>
  ) | (
    { __typename: 'Error' }
    & Pick<Error, 'errorType' | 'message'>
  ) }
);

export type DecodeInvoiceQueryVariables = {
  inv: Scalars['String'];
};


export type DecodeInvoiceQuery = (
  { __typename?: 'Query' }
  & { decodeInvoice?: Maybe<(
    { __typename?: 'DecodedInvoice' }
    & Pick<DecodedInvoice, 'numSatoshis' | 'description' | 'descriptionHash' | 'destination' | 'paymentHash' | 'paymentAddr' | 'timestamp' | 'expiry'>
  )> }
);

export type FeedQueryVariables = {};


export type FeedQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename: 'User' }
    & Pick<User, 'balance'>
    & { feed: Array<Maybe<(
      { __typename: 'Deposit' }
      & Pick<Deposit, 'address' | 'amount' | 'confirmations' | 'blockhash' | 'blockindex' | 'blocktime' | 'txid' | 'time' | 'timereceived' | 'comment'>
    ) | (
      { __typename: 'PaidInvoice' }
      & Pick<PaidInvoice, 'amount' | 'fee' | 'paidAt' | 'expiry' | 'timestamp' | 'paymentRequest' | 'paymentHash' | 'paymentPreimage' | 'memo'>
    ) | (
      { __typename: 'UserInvoice' }
      & Pick<UserInvoice, 'memo' | 'amount' | 'paymentRequest' | 'paid' | 'paidAt' | 'expiry' | 'timestamp' | 'paymentHash' | 'paymentPreimage'>
    )>> }
  ) | (
    { __typename: 'Error' }
    & Pick<Error, 'message' | 'errorType'>
  ) }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename: 'User' }
    & Pick<User, 'balance' | 'created' | 'btcAddress'>
    & { feed: Array<Maybe<(
      { __typename: 'Deposit' }
      & Pick<Deposit, 'address' | 'amount' | 'confirmations' | 'blockhash' | 'blockindex' | 'blocktime' | 'txid' | 'time' | 'timereceived' | 'comment'>
    ) | (
      { __typename: 'PaidInvoice' }
      & Pick<PaidInvoice, 'amount' | 'fee' | 'paidAt' | 'expiry' | 'timestamp' | 'paymentRequest' | 'paymentHash' | 'paymentPreimage' | 'memo'>
    ) | (
      { __typename: 'UserInvoice' }
      & Pick<UserInvoice, 'memo' | 'amount' | 'paymentRequest' | 'paid' | 'paidAt' | 'expiry' | 'timestamp' | 'paymentHash' | 'paymentPreimage'>
    )>> }
  ) | (
    { __typename: 'Error' }
    & Pick<Error, 'message' | 'errorType'>
  ) }
);


export const AddInvoiceDocument = gql`
    mutation addInvoice($amt: Int!, $memo: String!) {
  addInvoice(amt: $amt, memo: $memo) {
    __typename
    ... on UserInvoice {
      amount
      paid
      paidAt
      expiry
      timestamp
      paymentRequest
      paymentHash
      paymentPreimage
      memo
    }
    ... on Error {
      errorType
      message
    }
  }
}
    `;

/**
 * __useAddInvoiceMutation__
 *
 * To run a mutation, you first call `useAddInvoiceMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAddInvoiceMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useAddInvoiceMutation({
 *   variables: {
 *      amt: // value for 'amt'
 *      memo: // value for 'memo'
 *   },
 * });
 */
export function useAddInvoiceMutation(baseOptions?: VueApolloComposable.UseMutationOptions<AddInvoiceMutation, AddInvoiceMutationVariables>) {
            return VueApolloComposable.useMutation<AddInvoiceMutation, AddInvoiceMutationVariables>(AddInvoiceDocument, baseOptions);
          }
export type AddInvoiceMutationCompositionFunctionResult = ReturnType<typeof useAddInvoiceMutation>;
export const BakeMacaroonDocument = gql`
    mutation bakeMacaroon {
  bakeMacaroon(caveats: [ADD_INVOICE]) {
    __typename
    ... on Error {
      errorType
      message
    }
    ... on AttenuatedMacaroon {
      macaroon
    }
  }
}
    `;

/**
 * __useBakeMacaroonMutation__
 *
 * To run a mutation, you first call `useBakeMacaroonMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBakeMacaroonMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBakeMacaroonMutation({
 *   variables: {
 *   },
 * });
 */
export function useBakeMacaroonMutation(baseOptions?: VueApolloComposable.UseMutationOptions<BakeMacaroonMutation, BakeMacaroonMutationVariables>) {
            return VueApolloComposable.useMutation<BakeMacaroonMutation, BakeMacaroonMutationVariables>(BakeMacaroonDocument, baseOptions);
          }
export type BakeMacaroonMutationCompositionFunctionResult = ReturnType<typeof useBakeMacaroonMutation>;
export const CreateUserDocument = gql`
    mutation createUser($role: Role) {
  createUser(role: $role) {
    __typename
    ... on NewUser {
      username
      password
      tokens {
        access
        refresh
      }
    }
    ... on Error {
      errorType
      message
    }
  }
}
    `;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateUserMutation({
 *   variables: {
 *      role: // value for 'role'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: VueApolloComposable.UseMutationOptions<CreateUserMutation, CreateUserMutationVariables>) {
            return VueApolloComposable.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
          }
export type CreateUserMutationCompositionFunctionResult = ReturnType<typeof useCreateUserMutation>;
export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    __typename
    ... on AuthPayload {
      refresh
      access
    }
    ... on Error {
      errorType
      message
    }
  }
}
    `;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables>) {
            return VueApolloComposable.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
          }
export type LoginMutationCompositionFunctionResult = ReturnType<typeof useLoginMutation>;
export const LogoutDocument = gql`
    mutation logout($universal: Boolean!) {
  logout(universal: $universal) {
    __typename
    ... on Error {
      errorType
      message
    }
  }
}
    `;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLogoutMutation({
 *   variables: {
 *      universal: // value for 'universal'
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: VueApolloComposable.UseMutationOptions<LogoutMutation, LogoutMutationVariables>) {
            return VueApolloComposable.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
          }
export type LogoutMutationCompositionFunctionResult = ReturnType<typeof useLogoutMutation>;
export const RefreshMacaroonsDocument = gql`
    mutation refreshMacaroons {
  refreshMacaroons {
    __typename
    ... on AuthPayload {
      refresh
      access
    }
    ... on Error {
      message
      errorType
    }
  }
}
    `;

/**
 * __useRefreshMacaroonsMutation__
 *
 * To run a mutation, you first call `useRefreshMacaroonsMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRefreshMacaroonsMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRefreshMacaroonsMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshMacaroonsMutation(baseOptions?: VueApolloComposable.UseMutationOptions<RefreshMacaroonsMutation, RefreshMacaroonsMutationVariables>) {
            return VueApolloComposable.useMutation<RefreshMacaroonsMutation, RefreshMacaroonsMutationVariables>(RefreshMacaroonsDocument, baseOptions);
          }
export type RefreshMacaroonsMutationCompositionFunctionResult = ReturnType<typeof useRefreshMacaroonsMutation>;
export const SendPaymentDocument = gql`
    mutation sendPayment($inv: String!) {
  payInvoice(invoice: $inv) {
    __typename
    ... on Error {
      errorType
      message
    }
    ... on PaidInvoice {
      amount
      fee
      paidAt
      expiry
      timestamp
      paymentRequest
      paymentHash
      paymentPreimage
      memo
    }
  }
}
    `;

/**
 * __useSendPaymentMutation__
 *
 * To run a mutation, you first call `useSendPaymentMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSendPaymentMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSendPaymentMutation({
 *   variables: {
 *      inv: // value for 'inv'
 *   },
 * });
 */
export function useSendPaymentMutation(baseOptions?: VueApolloComposable.UseMutationOptions<SendPaymentMutation, SendPaymentMutationVariables>) {
            return VueApolloComposable.useMutation<SendPaymentMutation, SendPaymentMutationVariables>(SendPaymentDocument, baseOptions);
          }
export type SendPaymentMutationCompositionFunctionResult = ReturnType<typeof useSendPaymentMutation>;
export const DecodeInvoiceDocument = gql`
    query DecodeInvoice($inv: String!) {
  decodeInvoice(invoice: $inv) {
    numSatoshis
    description
    descriptionHash
    destination
    paymentHash
    paymentAddr
    timestamp
    expiry
  }
}
    `;

/**
 * __useDecodeInvoiceQuery__
 *
 * To run a query within a Vue component, call `useDecodeInvoiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useDecodeInvoiceQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useDecodeInvoiceQuery(
 *   {
 *      inv: // value for 'inv'
 *   }
 * );
 */
type ReactiveFunctionDecodeInvoiceQuery = () => DecodeInvoiceQueryVariables
export function useDecodeInvoiceQuery(variables: DecodeInvoiceQueryVariables | VueCompositionApi.Ref<DecodeInvoiceQueryVariables> | ReactiveFunctionDecodeInvoiceQuery, baseOptions?: VueApolloComposable.UseQueryOptions<DecodeInvoiceQuery, DecodeInvoiceQueryVariables>) {
          return VueApolloComposable.useQuery<DecodeInvoiceQuery, DecodeInvoiceQueryVariables>(DecodeInvoiceDocument, variables, baseOptions);
        }
export type DecodeInvoiceQueryCompositionFunctionResult = ReturnType<typeof useDecodeInvoiceQuery>;
export const FeedDocument = gql`
    query Feed {
  me {
    __typename
    ... on User {
      balance
      feed(paid: false, limit: 10, confirmations: 0, expired: false) {
        __typename
        ... on UserInvoice {
          memo
          amount
          paymentRequest
          paid
          paidAt
          expiry
          timestamp
          paymentRequest
          paymentHash
          paymentPreimage
        }
        ... on PaidInvoice {
          amount
          fee
          paidAt
          expiry
          timestamp
          paymentRequest
          paymentHash
          paymentPreimage
          memo
        }
        ... on Deposit {
          address
          amount
          confirmations
          blockhash
          blockindex
          blocktime
          txid
          time
          timereceived
          comment
        }
      }
    }
    ... on Error {
      message
      errorType
    }
  }
}
    `;

/**
 * __useFeedQuery__
 *
 * To run a query within a Vue component, call `useFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useFeedQuery(
 *   {
 *   }
 * );
 */
type ReactiveFunctionFeedQuery = () => FeedQueryVariables
export function useFeedQuery(variables?: FeedQueryVariables | VueCompositionApi.Ref<FeedQueryVariables> | ReactiveFunctionFeedQuery, baseOptions?: VueApolloComposable.UseQueryOptions<FeedQuery, FeedQueryVariables>) {
          return VueApolloComposable.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, variables, baseOptions);
        }
export type FeedQueryCompositionFunctionResult = ReturnType<typeof useFeedQuery>;
export const MeDocument = gql`
    query me {
  me {
    __typename
    ... on User {
      balance
      created
      btcAddress
      feed(paid: false, limit: 10, confirmations: 0, expired: false) {
        __typename
        ... on UserInvoice {
          memo
          amount
          paymentRequest
          paid
          paidAt
          expiry
          timestamp
          paymentRequest
          paymentHash
          paymentPreimage
        }
        ... on PaidInvoice {
          amount
          fee
          paidAt
          expiry
          timestamp
          paymentRequest
          paymentHash
          paymentPreimage
          memo
        }
        ... on Deposit {
          address
          amount
          confirmations
          blockhash
          blockindex
          blocktime
          txid
          time
          timereceived
          comment
        }
      }
    }
    ... on Error {
      message
      errorType
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a Vue component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMeQuery(
 *   {
 *   }
 * );
 */
type ReactiveFunctionMeQuery = () => MeQueryVariables
export function useMeQuery(variables?: MeQueryVariables | VueCompositionApi.Ref<MeQueryVariables> | ReactiveFunctionMeQuery, baseOptions?: VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>) {
          return VueApolloComposable.useQuery<MeQuery, MeQueryVariables>(MeDocument, variables, baseOptions);
        }
export type MeQueryCompositionFunctionResult = ReturnType<typeof useMeQuery>;