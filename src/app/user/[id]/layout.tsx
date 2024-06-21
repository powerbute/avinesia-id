import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/colors.css';

export const metadata: Metadata = {
  title: 'Авинесия ID',
  description: '',
};

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
