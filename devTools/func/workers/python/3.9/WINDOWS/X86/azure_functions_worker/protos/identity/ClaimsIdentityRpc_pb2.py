# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: identity/ClaimsIdentityRpc.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from azure_functions_worker.protos.shared import NullableTypes_pb2 as shared_dot_NullableTypes__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n identity/ClaimsIdentityRpc.proto\x1a\x1ashared/NullableTypes.proto\"\xb0\x01\n\x11RpcClaimsIdentity\x12,\n\x13\x61uthentication_type\x18\x01 \x01(\x0b\x32\x0f.NullableString\x12(\n\x0fname_claim_type\x18\x02 \x01(\x0b\x32\x0f.NullableString\x12(\n\x0frole_claim_type\x18\x03 \x01(\x0b\x32\x0f.NullableString\x12\x19\n\x06\x63laims\x18\x04 \x03(\x0b\x32\t.RpcClaim\"\'\n\x08RpcClaim\x12\r\n\x05value\x18\x01 \x01(\t\x12\x0c\n\x04type\x18\x02 \x01(\tB,\n*com.microsoft.azure.functions.rpc.messagesb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'identity.ClaimsIdentityRpc_pb2', _globals)
if _descriptor._USE_C_DESCRIPTORS == False:
  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n*com.microsoft.azure.functions.rpc.messages'
  _globals['_RPCCLAIMSIDENTITY']._serialized_start=65
  _globals['_RPCCLAIMSIDENTITY']._serialized_end=241
  _globals['_RPCCLAIM']._serialized_start=243
  _globals['_RPCCLAIM']._serialized_end=282
# @@protoc_insertion_point(module_scope)
