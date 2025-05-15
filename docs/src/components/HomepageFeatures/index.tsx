import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>> | null;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy Integration',
    Svg: null,
    description: (
      <>
        Quickly integrate mem.ai functionality into your TypeScript applications. The SDK simplifies
        interactions with the mem.ai API.
      </>
    ),
  },
  {
    title: 'Powerful Mem It Feature',
    Svg: null,
    description: (
      <>
        Leverage the core Mem It feature to programmatically create content in your mem.ai knowledge
        base directly from your applications.
      </>
    ),
  },
  {
    title: 'TypeScript Support',
    Svg: null,
    description: (
      <>
        Built with TypeScript, the SDK provides strong typing for a better developer experience and
        fewer runtime errors.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">{Svg && <Svg className={styles.featureSvg} role="img" />}</div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
