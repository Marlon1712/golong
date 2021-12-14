import React from 'react'
import { Ul } from '../styles/components/burger'
import { NextPage } from 'next'
import Link from 'next/link'
import {
  FaUser,
  FaFileAlt,
  FaFileInvoice,
  FaBookMedical,
  FaTools,
  FaBroom
} from 'react-icons/fa'
import { HiClipboardCheck } from 'react-icons/hi'

interface props {
  open: boolean
}

const RightNav: NextPage<props> = ({ open }) => {
  return (
    <Ul open={open}>
      <li>
        <Link href="/Usuario" scroll={false}>
          <a className="link">
            <FaUser />
            {' Usuarios'}
          </a>
        </Link>
      </li>
      <li>
        <Link href="/Lup" scroll={false}>
          <a className="link">
            <FaFileAlt />
            {" Lup's"}
          </a>
        </Link>
      </li>
      <li>
        <Link href="/Procedimento" scroll={false}>
          <a className="link">
            <FaFileInvoice />
            {' Procedimentos'}
          </a>
        </Link>
      </li>
      <li>
        <Link href="/CheckList" scroll={false}>
          <a className="link">
            <HiClipboardCheck />
            {' CheckList'}
          </a>
        </Link>
      </li>
      <li>
        <Link href="/BookFalha" scroll={false}>
          <a className="link">
            <FaBookMedical />
            {' Book Falhas'}
          </a>
        </Link>
      </li>
      <li>
        <Link href="/BookFalha" scroll={false}>
          <a className="link">
            <FaTools />
            {' Manutenção'}
          </a>
        </Link>
      </li>
      <li>
        <Link href="/BookFalha" scroll={false}>
          <a className="link">
            <FaBroom />
            {' Cronograma'}
          </a>
        </Link>
      </li>
    </Ul>
  )
}
export default RightNav
