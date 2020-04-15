import { Link as RouterLink } from 'react-router-dom';
import { Link as RebassLink } from 'rebass/styled-components';
import * as React from 'react';

export const Link = (props: any) => <RebassLink {...props} as={RouterLink} />;
