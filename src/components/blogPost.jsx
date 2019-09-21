import React from 'react';
import { graphql } from 'gatsby';

import styled from '@emotion/styled';
import Icon from '@mdi/react';
import { mdiCalendar, mdiClockOutline } from '@mdi/js';
import { Disqus } from 'gatsby-plugin-disqus';

import settings from '../settings';
import routes from '../routes';

import Layout from './layout';
import Meta from './meta';
import { humanizeTimeToRead } from '../utils';

const Title = styled.div`
  font-size: 2em;
`;

const MetadataContainer = styled.div`
  margin-top: 0.5em;
  opacity: 0.65;
  font-size: 0.85em;

  svg {
    margin-top: 0.06em;
    vertical-align: top;
    width: 1em;
  }

  span + span {
    margin-left: 1em;
  }
`;

const Content = styled.div`
  code {
    font-family: 'Fira Code Light', 'Consolas', 'Courier New', 'Courier',
      monospace;
    font-size: 0.8em;
    line-height: 1.2em;
  }

  code:not(.hljs) {
    font-family: 'Fira Code', 'Consolas', 'Courier New', 'Courier', monospace;
    background-color: #f0f0f0;
  }
`;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
      }
      fields {
        slug
      }
      html
      excerpt(format: PLAIN, pruneLength: 248)
      timeToRead
    }
  }
`;

export default ({ data }) => {
  const disqusConfig = {
    url: `${settings.siteDomain}${routes.dynamic.blogPost.getPath(
      data.markdownRemark.fields.slug
    )}`,
    identifier: `Blog/${data.markdownRemark.fields.slug}`,
    title: data.markdownRemark.frontmatter.title
  };

  return (
    <Layout>
      <Meta
        title={data.markdownRemark.frontmatter.title}
        description={data.markdownRemark.excerpt}
      />

      <Title>{data.markdownRemark.frontmatter.title}</Title>

      <MetadataContainer>
        <span>
          <Icon path={mdiCalendar} /> {data.markdownRemark.frontmatter.date}
        </span>

        <span>
          <Icon path={mdiClockOutline} />
          {` `}
          {humanizeTimeToRead(data.markdownRemark.timeToRead)}
        </span>
      </MetadataContainer>

      <Content dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />

      <Disqus config={disqusConfig} />
    </Layout>
  );
};
