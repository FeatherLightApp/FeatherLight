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

export enum Action {
  /**
   * Allows user to attenuate macaroon to only add invoices
   * this means user can give attenuated macaroon to others to add invoices on their behalf
   */
  AddInvoice = 'ADD_INVOICE',
  /** Used to limit the scope of token to only refreshMacaroon */
  Refresh = 'REFRESH'
}


export type BalanceResponse = NodeBalance | Error;

export type BaseUser = {
  balance: Scalars['Int'];
  btcAddress: Scalars['String'];
  invoices: Array<Maybe<UserInvoice>>;
  payments: Array<Maybe<PaidInvoice>>;
  deposits: Array<Maybe<Deposit>>;
  role: Role;
  created: Scalars['Int'];
};


export type BaseUserInvoicesArgs = {
  paid?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
};


export type BaseUserPaymentsArgs = {
  start?: Maybe<Scalars['Int']>;
  end?: Maybe<Scalars['Int']>;
};

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
  open: Array<Maybe<Channel>>;
  pending: PendingChannelsResponse;
};


export type ChannelPayloadOpenArgs = {
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

export type DecodeInvoicePayload = {
   __typename?: 'DecodeInvoicePayload';
  error?: Maybe<Scalars['String']>;
  destination?: Maybe<Scalars['String']>;
  paymentHash?: Maybe<Scalars['String']>;
  numSatoshis?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['Int']>;
  expiry?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  descriptionHash?: Maybe<Scalars['String']>;
  fallbackAddr?: Maybe<Scalars['String']>;
};

export type DecodeInvoiceresponse = DecodeInvoicePayload | Error;

export type Deposit = {
   __typename?: 'Deposit';
  address: Scalars['String'];
  amount: Scalars['Int'];
  confirmations: Scalars['Int'];
  blockhash: Scalars['String'];
  blockindex: Scalars['Int'];
  blocktime: Scalars['Int'];
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
  InsufficientFunds = 'InsufficientFunds'
}

export type Feature = {
   __typename?: 'Feature';
  name?: Maybe<Scalars['String']>;
  isRequired?: Maybe<Scalars['Boolean']>;
  isKnown?: Maybe<Scalars['Boolean']>;
};

export type FeaturesEntry = {
   __typename?: 'FeaturesEntry';
  key?: Maybe<Scalars['Int']>;
  value?: Maybe<Feature>;
};

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

export type HopHint = {
   __typename?: 'HopHint';
  nodeID?: Maybe<Scalars['String']>;
  chanID?: Maybe<Scalars['Int']>;
  feeBaseMsat?: Maybe<Scalars['Int']>;
  feePropMilionth?: Maybe<Scalars['Int']>;
  cltvExpiryDelta?: Maybe<Scalars['Int']>;
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
  memo?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  /** Creates a new user of type Role, rate limited mutation */
  createUser: NewUserResponse;
  /**
   * Logs the user in issuing a full macaroon which does not expire 
   * and a limited refresh macaroon which expires in 7 days
   * Limited to 5 operations per day
   */
  login: TokenResponse;
  /** Rotates the macaroon key for the user, causing all issued macaroons to be invalidated */
  logout?: Maybe<Error>;
  /** Issues new token payload: refresh token and full token */
  refreshMacaroons: TokenResponse;
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
  payInvoice: PayInvoiceResponse;
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
  tokens: TokenPayload;
  balance: Scalars['Int'];
  btcAddress: Scalars['String'];
  invoices: Array<Maybe<UserInvoice>>;
  payments: Array<Maybe<PaidInvoice>>;
  deposits: Array<Maybe<Deposit>>;
  role: Role;
  created: Scalars['Int'];
};


export type NewUserInvoicesArgs = {
  paid?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
};


export type NewUserPaymentsArgs = {
  start?: Maybe<Scalars['Int']>;
  end?: Maybe<Scalars['Int']>;
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
  value: Scalars['Int'];
  expiry: Scalars['Int'];
  timestamp: Scalars['Int'];
  paymentRequest: Scalars['String'];
  paymentHash: Scalars['B64'];
  paymentPreimage: Scalars['B64'];
  memo?: Maybe<Scalars['String']>;
};

export type PaidInvoiceResponse = UserInvoice | Error;

/** Either error . or an invoice paid by this user (payee) */
export type PayInvoiceResponse = PaidInvoice | Error;

export type PeerInfo = {
   __typename?: 'PeerInfo';
  id: Scalars['Int'];
  addr: Scalars['String'];
  conntime: Scalars['Int'];
  bytessent: Scalars['Int'];
  bytesrecv: Scalars['Int'];
};

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
  decodeInvoice: DecodeInvoicePayload;
  info: InfoPayload;
  genericRPC?: Maybe<Scalars['String']>;
};


export type QueryDecodeInvoiceArgs = {
  invoice: Scalars['String'];
};


export type QueryGenericRpcArgs = {
  command: Scalars['String'];
  params?: Maybe<Scalars['String']>;
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

export type Route = {
   __typename?: 'Route';
  totalTimeLock: Scalars['Int'];
  totalFees: Scalars['Int'];
  totalAmt: Scalars['Int'];
};

export type RouteHint = {
   __typename?: 'RouteHint';
  hopHints?: Maybe<Array<Maybe<HopHint>>>;
};

export type Subscription = {
   __typename?: 'Subscription';
  invoice: PaidInvoiceResponse;
};

export type TokenPayload = {
   __typename?: 'TokenPayload';
  access: Scalars['String'];
  refresh: Scalars['String'];
};

export type TokenResponse = TokenPayload | Error;

export type User = BaseUser & {
   __typename?: 'User';
  /** Access token is a jwt which must be supplied in the header for authorized requests */
  balance: Scalars['Int'];
  btcAddress: Scalars['String'];
  invoices: Array<Maybe<UserInvoice>>;
  payments: Array<Maybe<PaidInvoice>>;
  deposits: Array<Maybe<Deposit>>;
  role: Role;
  created: Scalars['Int'];
};


export type UserInvoicesArgs = {
  paid?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
};


export type UserPaymentsArgs = {
  start?: Maybe<Scalars['Int']>;
  end?: Maybe<Scalars['Int']>;
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
  memo?: Maybe<Scalars['String']>;
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

export type CreateUserMutationVariables = {
  role?: Maybe<Role>;
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename: 'NewUser' }
    & Pick<NewUser, 'username' | 'password'>
    & { tokens: (
      { __typename?: 'TokenPayload' }
      & Pick<TokenPayload, 'access' | 'refresh'>
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
    { __typename: 'TokenPayload' }
    & Pick<TokenPayload, 'refresh' | 'access'>
  ) | (
    { __typename: 'Error' }
    & Pick<Error, 'errorType' | 'message'>
  ) }
);

export type LogoutMutationVariables = {};


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
    { __typename: 'TokenPayload' }
    & Pick<TokenPayload, 'refresh' | 'access'>
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
    & Pick<User, 'balance' | 'created'>
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
    ... on TokenPayload {
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
    mutation logout {
  logout {
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
    ... on TokenPayload {
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
export const MeDocument = gql`
    query me {
  me {
    __typename
    ... on User {
      balance
      created
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