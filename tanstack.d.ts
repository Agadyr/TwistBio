import '@tanstack/react-table'
import { Cell, Column, Row, RowData, Table } from '@tanstack/table-core/src/types'
import { Getter } from '@tanstack/table-core/src/utils'
import { ColumnProps, GetCellPropsResult } from 'interfaces/table.interfaces'
import { ApiError } from 'packages/api'

declare module '@tanstack/table-core' {
  type ColumnMeta = ColumnProps

  interface TableMeta<TData extends RowData> {
    updateData?: (value: string, columnId: string, rowIndex: number) => void
    onChangeInput?: (value: string, columnId: string, rowIndex: number) => void
    setData?: (value: string, columnId: string, rowIndex: number) => void
    applyEditData?: () => void
    inputHasChanged?: boolean
    loadingUpdateButton?: boolean
    isDataApplied?: boolean
    setIsDataApplied?: (value: boolean) => void
    newRowData?: Record<string, number | null>
  }

  interface CellContext<TData extends RowData, TValue = string | number | null, TMeta = any> {
    table: Table<TData>
    column: Column<TData, TValue>
    row: Row<TData>
    cell: Cell<TData, TValue>
    getValue: Getter<TValue>
    getRowData: Getter<TData>
    getCellProps: Getter<GetCellPropsResult>
    renderValue: Getter<TValue | null>
    getMeta: () => TMeta
  }
}

declare module '@tanstack/query-core' {
  export interface ToastError {
    message?: string | null
    showToast?: boolean
  }

  type RejectError =
    | string
    | ToastError
    | ((error?: ApiError | null) => (Partial<ApiError> & ToastError) | string | undefined | null)
    | undefined
    | null

  interface Register {
    defaultError: ApiError | null
    queryMeta: {
      error?: RejectError
      onSuccess?: (data) => void
    }
    mutationMeta: {
      error?: RejectError
    }
  }
}
